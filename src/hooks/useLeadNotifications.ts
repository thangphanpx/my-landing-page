/**
 * 🔔 Lead Notification Hook - Admin notification system
 * 
 * Hook để hiển thị notification khi có lead data mới được bóc tách
 * Dành cho admin/owner để theo dõi realtime lead capture
 * 
 * @author AI Expert Assistant  
 * @version 1.0.0
 */

import { useState, useCallback, useEffect } from 'react';
import { LeadData } from '../lib/leadDataExtractor';

// Type for JSX elements
type ReactElement = React.ReactElement | null;

// ============================================================
// TYPES & INTERFACES
// ============================================================

// Timing constants for notifications
const NOTIFICATION_TIMEOUTS = {
  AUTO_CLOSE: 5000, // 5 seconds
  CLEANUP_INTERVAL: 60 * 60 * 1000, // 1 hour
  MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
} as const;

export interface LeadNotification {
  id: string;
  leadData: LeadData;
  timestamp: number;
  isRead: boolean;
}

export interface UseLeadNotificationsReturn {
  notifications: LeadNotification[];
  unreadCount: number;
  addNotification: (leadData: LeadData) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

interface NotificationPermissionResult {
  hasPermission: boolean;
  canRequest: boolean;
}

interface LeadNotificationBadgeResult {
  isVisible: boolean;
  unreadCount: number;
  badgeElement: null;
}

// ============================================================
// LEAD NOTIFICATIONS HOOK
// ============================================================

/**
 * Hook quản lý notifications cho lead data
 * Chỉ dành cho admin/owner để theo dõi
 */
export function useLeadNotifications(): UseLeadNotificationsReturn {
  const [notifications, setNotifications] = useState<LeadNotification[]>([]);

  // Add new notification khi có lead data mới
  const addNotification = useCallback((leadData: LeadData): void => {
    const notification = createNotification(leadData);
    addNotificationToState(notification, setNotifications);
    handleBrowserNotification(leadData);
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Tính số thông báo chưa đọc
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Auto-cleanup notifications cũ (> 24h)
  useEffect(() => {
    const cleanup = setInterval(() => {
      const oneDayAgo = Date.now() - NOTIFICATION_TIMEOUTS.MAX_AGE;
      setNotifications(prev => 
        prev.filter(notification => notification.timestamp > oneDayAgo)
      );
    }, NOTIFICATION_TIMEOUTS.CLEANUP_INTERVAL);

    return () => clearInterval(cleanup);
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
}

// ============================================================
// NOTIFICATION CREATION HELPERS
// ============================================================

/**
 * Tạo notification object từ lead data
 * @param leadData - Dữ liệu lead
 * @returns Notification object
 */
function createNotification(leadData: LeadData): LeadNotification {
  return {
    id: generateNotificationId(),
    leadData,
    timestamp: Date.now(),
    isRead: false,
  };
}

/**
 * Generate unique ID cho notification
 * @returns Unique notification ID
 */
function generateNotificationId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7);
  return `lead_${timestamp}_${random}`;
}

/**
 * Thêm notification vào state
 * @param notification - Notification cần thêm
 * @param setNotifications - State setter function
 */
function addNotificationToState(
  notification: LeadNotification,
  setNotifications: React.Dispatch<React.SetStateAction<LeadNotification[]>>
): void {
  setNotifications(prev => [notification, ...prev]);
}

/**
 * Xử lý browser notification
 * @param leadData - Dữ liệu lead
 */
function handleBrowserNotification(leadData: LeadData): void {
  if (isBrowserNotificationAvailable()) {
    showBrowserNotification(leadData);
  }
}

/**
 * Kiểm tra browser notification có available không
 * @returns true nếu có thể show notification
 */
function isBrowserNotificationAvailable(): boolean {
  return 'Notification' in window && Notification.permission === 'granted';
}

// ============================================================
// BROWSER NOTIFICATION UTILS
// ============================================================

/**
 * Request permission và show browser notification
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const permissionResult = checkNotificationSupport();
  
  if (!permissionResult.canRequest) {
    return permissionResult.hasPermission;
  }

  if (permissionResult.hasPermission) {
    return true;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/**
 * Kiểm tra notification support và permission
 * @returns Permission result object
 */
function checkNotificationSupport(): NotificationPermissionResult {
  if (!('Notification' in window)) {
    console.warn('Browser không hỗ trợ notifications');
    return { hasPermission: false, canRequest: false };
  }

  if (Notification.permission === 'granted') {
    return { hasPermission: true, canRequest: false };
  }

  if (Notification.permission === 'denied') {
    return { hasPermission: false, canRequest: false };
  }

  return { hasPermission: false, canRequest: true };
}

/**
 * Show browser notification cho lead data mới
 */
function showBrowserNotification(leadData: LeadData): void {
  if (!canShowNotification()) {
    return;
  }

  const notificationConfig = createNotificationConfig(leadData);
  const notification = new Notification(notificationConfig.title, notificationConfig.options);
  
  setupNotificationHandlers(notification);
}

/**
 * Kiểm tra có thể show notification không
 * @returns true nếu có thể show
 */
function canShowNotification(): boolean {
  return 'Notification' in window && Notification.permission === 'granted';
}

/**
 * Tạo config cho notification
 * @param leadData - Dữ liệu lead
 * @returns Notification config
 */
function createNotificationConfig(leadData: LeadData): {
  title: string;
  options: NotificationOptions;
} {
  const title = '🎯 Lead mới từ AI Chatbot!';
  const body = formatLeadForNotificationBody(leadData);
  
  return {
    title,
    options: {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'lead-notification',
      requireInteraction: false,
      silent: false,
    },
  };
}

/**
 * Format lead data cho notification body
 * @param leadData - Dữ liệu lead
 * @returns Formatted body text
 */
function formatLeadForNotificationBody(leadData: LeadData): string {
  const parts = [
    leadData.name && `👤 ${leadData.name}`,
    leadData.phone && `📞 ${leadData.phone}`,
    leadData.email && `📧 ${leadData.email}`,
  ].filter(Boolean);

  return parts.join(' • ') || 'Có thông tin liên hệ mới từ chatbot';
}

/**
 * Setup notification event handlers
 * @param notification - Notification instance
 */
function setupNotificationHandlers(notification: Notification): void {
  // Auto-close notification sau timeout
  setTimeout(() => {
    notification.close();
  }, NOTIFICATION_TIMEOUTS.AUTO_CLOSE);

  // Handle click
  notification.onclick = (): void => {
    window.focus();
    notification.close();
    // TODO: Navigate to leads page hoặc show lead details
  };
}

// ============================================================
// NOTIFICATION FORMATTING UTILS
// ============================================================

/**
 * Format lead data thành text ngắn gọn cho notification
 */
export function formatLeadForNotification(leadData: LeadData): string {
  const parts = [];
  
  if (leadData.name) parts.push(`👤 ${leadData.name}`);
  if (leadData.phone) parts.push(`📞 ${leadData.phone}`);
  if (leadData.email) parts.push(`📧 ${leadData.email}`);
  
  return parts.join(' • ') || '📝 Thông tin liên hệ mới';
}

/**
 * Get notification time ago text
 */
export function getNotificationTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
  return 'Vừa xong';
}

// ============================================================
// ADMIN NOTIFICATION SETTINGS
// ============================================================

/**
 * Check if lead notifications are enabled in localStorage
 */
export function isLeadNotificationsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('leadNotificationsEnabled') === 'true';
}

/**
 * Enable/disable lead notifications
 */
export function setLeadNotificationsEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('leadNotificationsEnabled', enabled.toString());
  
  if (enabled) {
    requestNotificationPermission();
  }
}

/**
 * Admin-only: Show floating notification badge
 */
export function useLeadNotificationBadge(): LeadNotificationBadgeResult {
  const { unreadCount } = useLeadNotifications();
  
  // Compute visibility based on admin status and unread count
  const isAdmin = isAdminUser();
  const isVisible = isAdmin && unreadCount > 0;

  return {
    isVisible,
    unreadCount,
    badgeElement: null,
  };
}

/**
 * Kiểm tra user có phải admin không
 * @returns true nếu là admin
 */
function isAdminUser(): boolean {
  // Chỉ hiển thị cho admin (có thể check admin status ở đây)
  return process.env.NODE_ENV === 'development' || 
         (typeof window !== 'undefined' && window.location.hostname === 'localhost');
}

