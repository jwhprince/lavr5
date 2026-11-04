import {NextRequest,NextResponse} from 'next/server';
import {validateLead} from '@/lib/lead-validation.mjs';
export const runtime='nodejs';
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');
 const expectedOrigin=process.env.SITE_URL || `${request.nextUrl.protocol}//${request.headers.get('host')}`;
 if(!origin||origin!==expectedOrigin)return NextResponse.json({error:'Недопустимый источник запроса.'},{status:403});
 let body;
 try{const text=await request.text();if(new TextEncoder().encode(text).length>4096)return NextResponse.json({error:'Слишком большой запрос.'},{status:413});body=JSON.parse(text)}catch{return NextResponse.json({error:'Не удалось прочитать заявку.'},{status:400})}
 const lead=validateLead(body);
 if(!lead)return NextResponse.json({error:'Проверьте имя, телефон и согласие на обработку данных.'},{status:400});
 if(!process.env.LEAD_WEBHOOK_URL||process.env.SITE_READY!=='true')return NextResponse.json({error:'Приём заявок пока не подключён. Пожалуйста, вернитесь позже.'},{status:503});
 try{const url=new URL(process.env.LEAD_WEBHOOK_URL);if(url.protocol!=='https:')throw new Error('Invalid configuration');const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.LEAD_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.LEAD_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify({...lead,createdAt:new Date().toISOString(),source:'volta-website'}),signal:AbortSignal.timeout(8000),redirect:'error'});if(!response.ok)throw new Error('Delivery failed');return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}})}catch{return NextResponse.json({error:'Не удалось доставить заявку. Попробуйте позже.'},{status:502})}
}
