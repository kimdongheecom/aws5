"use client";

import React from 'react';

// 정보 섹션을 위한 재사용 컴포넌트
const InfoSection = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 text-gray-700 leading-relaxed text-sm">
            {children}
        </div>
    </section>
);

// 활동 카드를 위한 재사용 컴포넌트 (h-full 제거하여 크기 축소)
const ActivityCard = ({ title, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
        <h4 className="font-bold text-blue-600 text-md mb-2">{title}</h4>
        <div className="text-sm text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);


export default function BiodiversityConservationPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-10 w-full max-w-screen-xl flex flex-col" style={{minHeight: '90vh'}}>
        {/* Page Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-8 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Environmental</h1>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">2023 한국중부발전 지속가능경영보고서</p>
                <p className="text-lg font-bold text-blue-600">70</p>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
            <InfoSection title="생물다양성 보전">
                <h3 className="text-md font-bold text-gray-800 mt-4">해양생태계 보전</h3>
                <p className="mt-1">
                    한국중부발전은 발전소 인근 지역 어민의 삶의 터전인 해양 보전의 필요성을 인식하고, 지역사회와 공존하여 상생발전하기 위한 다양한 프로그램과 지원사업을 진행하고 있습니다.
                </p>
            </InfoSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column (space-y-4로 간격 조정) */}
                <div className="space-y-4">
                    <ActivityCard title="민·관·공 협력 해양쓰레기 220톤 수거 및 업사이클">
                        <p>
                            한국중부발전은 2021년부터 2023년 8월까지 해양수산부가 주관하는 반려해변 프로그램에 적극 참여하였습니다. 총 3년에 걸쳐 약 220톤의 해양쓰레기를 수거하였으며, 이를 업사이클링하여 지역사회에 기부하는 등 다양한 성과를 창출하였습니다.
                        </p>
                    </ActivityCard>
                     <ActivityCard title="친환경 부표 보급">
                        <p>
                            스티로폼 부표로 인한 해양 오염의 심각성과 해양생태계 산업의 중요성을 인식하고 2021년부터 친환경 부표를 지역 어민에게 보급하고 있습니다. 지금까지 16,180개의 부표를 입찰참여 어업인에게 보급하였습니다.
                        </p>
                    </ActivityCard>
                     <ActivityCard title="그물에 걸린 바다 살리기">
                        <p>
                            해양 침적 폐그물 등 해양 폐기물로 인한 생태계 위협을 방지하기 위하여 2023년부터 해양 폐기물을 수거하여 업사이클링하고 있습니다. 지역주민의 자발적인 참여로 50톤의 폐어망을 수거하여 해양쓰레기를 줄이는 데 기여하였습니다.
                        </p>
                    </ActivityCard>
                </div>

                {/* Right Column (space-y-4로 간격 조정) */}
                <div className="space-y-4">
                    <ActivityCard title="지역 어민 지원을 통한 환경오염물질 배출 저감 및 에너지 사용 절감">
                        <p>
                            어구 자동화 세척시설에 사용되는 어구 세척수의 미세 플라스틱 발생을 저감하기 위하여 여과장치 설치를 지원하고 있습니다. 2023년에는 110척의 소형 어선을 대상으로 총 22,000장의 표식을 지원하였습니다.
                        </p>
                    </ActivityCard>
                    <ActivityCard title="소형 어선 대상 발전설비 지원사업">
                        <p>
                            한국중부발전은 어선에서 쓰이는 유류와 에너지를 절감하기 위하여 보령시 연안어업인 연합회 소속 소형 어선 100척을 대상으로 태양광 발전설비 설치를 지원하였습니다. 이를 통하여 연 75,000L의 유류를 절감하고 미세먼지 200kg의 배출을 저감할 수 있었으며, 2024년에는 낚시어선 등으로 지원 대상을 확대하여 총 500척의 태양광 발전설비 설치를 지원하고자 합니다.
                        </p>
                    </ActivityCard>
                </div>
            </div>
        </main>
        
        {/* 주석 영역 추가 */}
        <footer className="pt-6 border-t border-gray-200 mt-8 shrink-0">
            <h4 className="font-semibold text-gray-700 mb-2">주석</h4>
            <p className="text-sm text-gray-600">
              * 여기에 주석 내용을 입력할 수 있습니다.
            </p>
        </footer>
      </div>
    </div>
  );
}
