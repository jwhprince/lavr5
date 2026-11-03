import type {MetadataRoute} from 'next';
import {published,siteUrl} from '@/lib/content';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:published?'/':undefined,disallow:published?['/api/']:['/']},...(published?{sitemap:`${siteUrl}/sitemap.xml`,host:siteUrl}:{})}}
