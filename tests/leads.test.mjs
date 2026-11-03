import test from 'node:test';
import assert from 'node:assert/strict';
import {validateLead} from '../lib/lead-validation.mjs';
const valid={name:'Анна',phone:'+7 (999) 123-45-67',direction:'Латина',consent:'yes',website:''};
test('валидная заявка нормализуется',()=>assert.equal(validateLead({...valid,name:' Анна '}).name,'Анна'));
test('согласие обязательно',()=>assert.equal(validateLead({...valid,consent:undefined}),null));
test('телефон, направление и ловушка проверяются',()=>{for(const patch of [{phone:'123'},{direction:'wrong'},{website:'spam'},{name:'<script>'}])assert.equal(validateLead({...valid,...patch}),null)});
test('неверные типы отклоняются',()=>{for(const body of [null,[],1,{...valid,phone:123}])assert.equal(validateLead(body),null)});
