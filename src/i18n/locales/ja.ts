import { Translations } from './en'

const jaTranslations: { translations: Translations } = {
  translations: {
    // Navigation
    dashboard: 'ダッシュボード',
    events: 'イベント',
    bookings: '予約',
    flights: 'フライト',
    profile: 'プロフィール',
    users: 'ユーザー',
    logout: 'ログアウト',
    
    // Login
    pilotLogin: 'パイロットログイン',
    adminLogin: '管理者ログイン',
    jalPilotId: 'JALパイロットID',
    email: 'メールアドレス',
    password: 'パスワード',
    login: 'ログイン',
    signingIn: 'ログイン中...',
    switchToAdmin: '管理者に切り替え',
    switchToPilot: 'パイロットに切り替え',
    
    // Events
    upcomingEvents: '今後のイベント',
    pastEvents: '過去のイベント',
    createEvent: 'イベント作成',
    editEvent: 'イベント編集',
    deleteEvent: 'イベント削除',
    eventTitle: 'イベントタイトル',
    eventDescription: 'イベント説明',
    eventDate: 'イベント日付',
    startTime: '開始時間',
    endTime: '終了時間',
    departure: '出発地',
    arrival: '到着地',
    aircraft: '航空機',
    maxSlots: '最大スロット数',
    availableSlots: '利用可能スロット',
    bookedSlots: '予約済みスロット',
    
    // Bookings
    myBookings: 'マイ予約',
    allBookings: 'すべての予約',
    createBooking: '予約作成',
    cancelBooking: '予約キャンセル',
    bookingStatus: '予約ステータス',
    pending: '保留中',
    confirmed: '確認済み',
    cancelled: 'キャンセル済み',
    rejected: '拒否済み',
    
    // Flights
    departures: '出発便',
    arrivals: '到着便',
    flightNumber: 'フライト番号',
    aircraftType: '航空機タイプ',
    gate: 'ゲート',
    terminal: 'ターミナル',
    status: 'ステータス',
    onTime: '定時',
    delayed: '遅延',
    cancelled: 'キャンセル',
    
    // Profile
    personalInfo: '個人情報',
    firstName: '名',
    lastName: '姓',
    callsign: 'コールサイン',
    jalId: 'JAL ID',
    role: '役割',
    pilot: 'パイロット',
    admin: '管理者',
    
    // Users
    allUsers: 'すべてのユーザー',
    searchUsers: 'ユーザー検索',
    userRole: 'ユーザー役割',
    joinDate: '参加日',
    lastActive: '最終アクティブ',
    
    // Common
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    create: '作成',
    search: '検索',
    filter: 'フィルター',
    clear: 'クリア',
    loading: '読み込み中...',
    error: 'エラー',
    success: '成功',
    warning: '警告',
    info: '情報',
    yes: 'はい',
    no: 'いいえ',
    confirm: '確認',
    
    // Messages
    loginSuccess: 'ログインに成功しました',
    loginError: 'ログインに失敗しました',
    bookingCreated: '予約が正常に作成されました',
    bookingCancelled: '予約がキャンセルされました',
    eventCreated: 'イベントが正常に作成されました',
    eventUpdated: 'イベントが正常に更新されました',
    eventDeleted: 'イベントが正常に削除されました',
    profileUpdated: 'プロフィールが正常に更新されました',
    
    // Footer
    copyright: '© 2024 日本航空バーチャル',
    jalVirtual: 'JALバーチャル',
    bookingSystem: '予約システム',
  },
}

export default jaTranslations
