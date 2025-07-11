"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/domain/auth/store/auth.store";

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuthStore();

  // 임시 데이터로 알림 목록을 생성합니다
  useEffect(() => {
    // TODO: API 연동 시 실제 알림 데이터를 가져오도록 수정
    const dummyNotifications: Notification[] = [
      {
        id: "1",
        title: "새로운 ESG 리포트가 등록되었습니다",
        message: "2024년 1분기 ESG 리포트가 업로드되었습니다. 지금 확인해보세요.",
        createdAt: "2024-03-20T09:00:00Z",
        isRead: false,
      },
      {
        id: "2",
        title: "프로필 업데이트 알림",
        message: "회원님의 프로필이 성공적으로 업데이트되었습니다.",
        createdAt: "2024-03-19T15:30:00Z",
        isRead: true,
      },
    ];

    setNotifications(dummyNotifications);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">알림</h1>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-lg border p-4 shadow-sm transition-colors ${
              notification.isRead
                ? "bg-gray-50 dark:bg-gray-800"
                : "bg-white dark:bg-gray-700"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="flex items-center text-lg font-semibold">
                  {notification.title}
                  {!notification.isRead && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary"></span>
                  )}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {notification.message}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {formatDate(notification.createdAt)}
                </p>
              </div>
              <button
                className="ml-4 text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  // TODO: 알림 삭제 기능 구현
                  setNotifications(notifications.filter((n) => n.id !== notification.id));
                }}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-gray-500">새로운 알림이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 