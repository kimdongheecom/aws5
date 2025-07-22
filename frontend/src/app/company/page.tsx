"use client";

import React, { useState } from 'react';
import axios from 'axios'; // axios를 import 합니다.
import { Building, User, Phone, Globe, Calendar, Briefcase, Link as LinkIcon, Users, MapPin } from 'lucide-react';

// 입력 필드를 위한 재사용 컴포넌트 (변경 없음)
const InputField = ({ id, label, type, placeholder, icon, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
            />
        </div>
    </div>
);


export default function CompanyPage() {
    const [companyInfo, setCompanyInfo] = useState({
        company_name: '',
        ceo_name: '',
        establishment_date: '',
        employee_count: '',
        company_add: '',
        company_num: '',
        company_hp: '',
        domestic_business: '',
        overseas_business: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // [수정] handleSubmit 함수를 axios를 사용하도록 변경합니다.
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';
        const apiUrl = `${gatewayUrl}/e/v2/company/companies/`;

        const payload = {
            ...companyInfo,
            employee_count: companyInfo.employee_count ? parseInt(companyInfo.employee_count, 10) : null,
            establishment_date: companyInfo.establishment_date || null,
        };

        console.log("API로 전송할 데이터 (axios):", payload);

        try {
            // axios.post를 사용하여 요청을 보냅니다.
            const response = await axios.post(apiUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // 인증 쿠키가 필요하다면 이 옵션을 사용합니다.
            });

            console.log("저장 성공:", response.data);
            alert("회사 정보가 성공적으로 저장되었습니다.");

        } catch (error) {
            console.error("API 요청 중 오류 발생:", error);
            
            if (axios.isAxiosError(error)) {
                // Axios 에러인 경우 더 상세한 정보를 얻을 수 있습니다.
                const errorMessage = error.response?.data?.detail || error.message;
                alert(`저장에 실패했습니다: ${errorMessage}`);
            } else {
                // 일반적인 자바스크립트 에러
                alert("API 요청 중 알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
                <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
                    <h1 className="text-2xl font-bold text-gray-800">Company</h1>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700">회사 기본 정보 등록</p>
                    </div>
                </header>

                <main className="flex-grow">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField id="company_name" label="회사명" type="text" placeholder="예: 한국중부발전" icon={<Building className="w-5 h-5 text-gray-400" />} value={companyInfo.company_name} onChange={handleChange} />
                            <InputField id="ceo_name" label="CEO 이름" type="text" placeholder="예: 김호빈" icon={<User className="w-5 h-5 text-gray-400" />} value={companyInfo.ceo_name} onChange={handleChange} />
                            <InputField id="establishment_date" label="설립일" type="date" placeholder="" icon={<Calendar className="w-5 h-5 text-gray-400" />} value={companyInfo.establishment_date} onChange={handleChange} />
                            <InputField id="employee_count" label="직원 수" type="number" placeholder="예: 2821" icon={<Users className="w-5 h-5 text-gray-400" />} value={companyInfo.employee_count} onChange={handleChange} />
                        </div>
                        
                        <InputField id="company_add" label="회사 주소" type="text" placeholder="예: 충남 보령시 보령북로 160" icon={<MapPin className="w-5 h-5 text-gray-400" />} value={companyInfo.company_add} onChange={handleChange} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField id="company_num" label="회사 번호" type="text" placeholder="예: 070-1234-5678" icon={<Phone className="w-5 h-5 text-gray-400" />} value={companyInfo.company_num} onChange={handleChange} />
                            <InputField id="company_hp" label="회사 홈페이지" type="text" placeholder="예: https://www.komipo.co.kr" icon={<LinkIcon className="w-5 h-5 text-gray-400" />} value={companyInfo.company_hp} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 백엔드 스키마와 필드명 일치 */}
                            <InputField id="domestic_business" label="국내 사업" type="text" placeholder="예: 화력발전소 운영, 신재생에너지 개발" icon={<Briefcase className="w-5 h-5 text-gray-400" />} value={companyInfo.domestic_business} onChange={handleChange} />
                            <InputField id="overseas_business" label="해외 사업" type="text" placeholder="예: 인도네시아, 베트남 등 O&M 사업" icon={<Globe className="w-5 h-5 text-gray-400" />} value={companyInfo.overseas_business} onChange={handleChange} />
                        </div>

                        <div className="pt-6 text-right">
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                                저장하기
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
