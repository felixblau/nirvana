export function HamburgerIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function GeminiEditIcon() {
  // ChatPCP compose icon sourced from the Figma storyboard export
  return (
    <svg className="nav-icon" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.62451 3.5H5.94951C4.47937 3.5 3.7443 3.5 3.18279 3.78611C2.68886 4.03777 2.28729 4.43935 2.03562 4.93327C1.74951 5.49479 1.74951 6.22986 1.74951 7.7V15.05C1.74951 16.5201 1.74951 17.2552 2.03562 17.8167C2.28729 18.3106 2.68886 18.7122 3.18279 18.9639C3.7443 19.25 4.47937 19.25 5.94951 19.25H13.2995C14.7696 19.25 15.5047 19.25 16.0662 18.9639C16.5602 18.7122 16.9617 18.3106 17.2134 17.8167C17.4995 17.2552 17.4995 16.5201 17.4995 15.05V11.375M6.99984 14H8.46506C8.8931 14 9.10712 14 9.30852 13.9516C9.48708 13.9088 9.65779 13.8381 9.81436 13.7421C9.99097 13.6339 10.1423 13.4826 10.445 13.1799L18.8124 4.81249C19.5372 4.08762 19.5372 2.91237 18.8124 2.18749C18.0875 1.46262 16.9122 1.46262 16.1874 2.18749L7.81994 10.5549C7.51728 10.8576 7.36594 11.0089 7.25772 11.1855C7.16177 11.3421 7.09106 11.5128 7.04819 11.6913C6.99984 11.8927 6.99984 12.1068 6.99984 12.5348V14Z" stroke="currentColor" strokeWidth="1.69014" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HeadphonesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" fill="currentColor" />
    </svg>
  )
}

export function ChevronRightSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function ShareIcon({ size = 20 }) {
  return (
    <svg className="nav-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

export function KebabIcon({ size = 20 }) {
  return (
    <svg className="nav-icon" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  )
}

export function PlusIcon() {
  return (
    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function SlidersIcon() {
  return (
    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(90deg)' }}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  )
}

export function MicIcon() {
  return (
    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="1" width="6" height="12" rx="3" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}

export function ThumbsUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

export function ThumbsDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
      <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
    </svg>
  )
}

export function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function CheckIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function StarIcon() {
  return <span className="star">★</span>
}

export function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--blue)" stroke="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

export function InsuranceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

export function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

export function ArrowRight() {
  return <span style={{ fontSize: 16 }}>→</span>
}

export function ChevronRight() {
  return (
    <svg className="card-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function LockIcon() {
  return (
    <svg className="cvv-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

export function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

export function DollarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  )
}

export function GemMDLogo() {
  return (
    <span style={{ fontSize: 13, fontWeight: 600, color: '#9aa0a6', letterSpacing: '-0.01em' }}>
      Gem<span style={{ color: '#4285f4' }}>MD</span>
    </span>
  )
}

export function NirvanaLogo() {
  const base = import.meta.env.BASE_URL
  return (
    <>
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
        <path d="M4.61773 6.36656C5.34075 6.36656 5.92687 5.78629 5.92687 5.07049C5.92687 4.35469 5.34075 3.77441 4.61773 3.77441C3.89471 3.77441 3.30859 4.35469 3.30859 5.07049C3.30859 5.78629 3.89471 6.36656 4.61773 6.36656Z" fill="#262626"/>
        <path d="M6.43896 6.78564C4.89906 7.11385 3.91949 8.61649 4.251 10.141C5.79154 9.81217 6.77112 8.31017 6.43896 6.78564Z" fill="#262626"/>
        <path d="M5.20703 2.63989C6.25746 3.80211 8.06126 3.90122 9.23519 2.86127C8.18411 1.69841 6.38096 1.5993 5.20703 2.63989Z" fill="#262626"/>
        <path d="M0 7.27949C1.17393 6.23954 2.97773 6.33865 4.02816 7.50151C2.85358 8.54145 1.05043 8.4417 0 7.27949Z" fill="#262626"/>
        <path d="M4.9855 0C5.31701 1.52453 4.33678 3.02717 2.79689 3.35473C2.46538 1.8302 3.44496 0.328201 4.9855 0Z" fill="#262626"/>
        <path d="M0.371952 2.22266C1.86764 2.71303 2.67821 4.31092 2.1829 5.79168C0.68786 5.30131 -0.123362 3.70342 0.371952 2.22266Z" fill="#262626"/>
        <path d="M7.03284 4.36768C8.52853 4.85805 9.3391 6.45593 8.84378 7.9367C7.34874 7.44568 6.53817 5.84844 7.03284 4.36768Z" fill="#262626"/>
      </svg>
      <svg width="50" height="10" viewBox="12 1 45 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
        <path d="M12.6143 8.59812V1.55595C12.6143 1.52699 12.6383 1.50318 12.6676 1.50318H13.8616C13.8883 1.50318 13.911 1.52313 13.9143 1.54952L14.0261 2.41249C14.0326 2.46076 14.0943 2.47556 14.1223 2.43566C14.5942 1.75738 15.4652 1.2876 16.4832 1.2876C18.0224 1.2876 19.0306 2.31274 19.0306 3.91771V8.59876C19.0306 8.62772 19.0065 8.65153 18.9773 8.65153H17.4764C17.4471 8.65153 17.4231 8.62772 17.4231 8.59876V3.99879C17.4231 3.20339 16.892 2.67698 15.9924 2.67698C14.9433 2.67698 14.2354 3.39195 14.2218 4.32249V8.59876C14.2218 8.62772 14.1977 8.65153 14.1685 8.65153H12.6676C12.6383 8.65089 12.6143 8.62707 12.6143 8.59812Z" fill="#262626"/>
        <path d="M19.9238 8.59835V1.55619C19.9238 1.52723 19.9479 1.50342 19.9771 1.50342H21.478C21.5073 1.50342 21.5313 1.52723 21.5313 1.55619V8.59835C21.5313 8.62731 21.5073 8.65112 21.478 8.65112H19.9771C19.9479 8.65112 19.9238 8.62731 19.9238 8.59835Z" fill="#262626"/>
        <path d="M22.4795 8.59835V1.55619C22.4795 1.52723 22.5035 1.50342 22.5328 1.50342H23.7269C23.7535 1.50342 23.7763 1.52272 23.7795 1.54911L23.9414 2.73835C23.9485 2.78919 24.0168 2.80078 24.0408 2.75573C24.5153 1.88246 24.9691 1.51565 26.1046 1.51565H26.3269C26.3549 1.51565 26.3776 1.53817 26.3776 1.56584L26.938 2.96938C26.9386 2.97131 26.9373 2.97324 26.9354 2.97324H26.4713C24.973 2.97324 24.0876 3.76865 24.0876 5.11749V8.59835C24.0876 8.62731 24.0636 8.65112 24.0343 8.65112H22.5334C22.5035 8.65112 22.4795 8.62731 22.4795 8.59835Z" fill="#262626"/>
        <path d="M30.0309 8.61894L27.0648 1.57614C27.0499 1.54139 27.0759 1.50342 27.1142 1.50342H28.7419C28.764 1.50342 28.7835 1.51693 28.7913 1.53688L30.8395 6.65295C30.857 6.69736 30.9207 6.69736 30.9383 6.65295L32.9735 1.53753C32.9813 1.51758 33.0014 1.50406 33.0229 1.50406H34.6505C34.6882 1.50406 34.7142 1.54267 34.6999 1.57678L31.7339 8.61894C31.7255 8.63889 31.706 8.65112 31.6845 8.65112H30.0803C30.0588 8.65112 30.0393 8.63825 30.0309 8.61894Z" fill="#262626"/>
        <path d="M34.4248 5.03681C34.4248 2.82499 35.8009 1.2876 37.7217 1.2876C38.7916 1.2876 39.6906 1.75866 40.1768 2.49486C40.2041 2.53605 40.2678 2.52125 40.2743 2.47234L40.3868 1.54952C40.39 1.52313 40.4128 1.50318 40.4394 1.50318H41.6329C41.6621 1.50318 41.6862 1.52699 41.6862 1.55595V8.59812C41.6862 8.62707 41.6621 8.65089 41.6329 8.65089H40.1456C40.1164 8.65089 40.0923 8.62707 40.0923 8.59812V7.85098C40.0923 7.79949 40.0267 7.7789 39.9961 7.82008C39.5203 8.4649 38.7435 8.85296 37.7763 8.85296C35.8275 8.85296 34.4248 7.28853 34.4248 5.03681ZM40.0917 5.0233C40.0917 3.60689 39.2746 2.62293 38.1026 2.62293C36.904 2.62293 36.0726 3.62104 36.0726 5.05033C36.0726 6.49312 36.8897 7.50476 38.0753 7.50476C39.2603 7.50476 40.0917 6.47961 40.0917 5.0233Z" fill="#262626"/>
        <path d="M42.4951 8.59812V1.55595C42.4951 1.52699 42.5192 1.50318 42.5484 1.50318H43.7425C43.7692 1.50318 43.7919 1.52313 43.7952 1.54952L43.907 2.41249C43.9135 2.46076 43.9752 2.47556 44.0032 2.43566C44.4751 1.75738 45.3461 1.2876 46.364 1.2876C47.9033 1.2876 48.9114 2.31274 48.9114 3.91771V8.59876C48.9114 8.62772 48.8874 8.65153 48.8581 8.65153H47.3572C47.328 8.65153 47.3039 8.62772 47.3039 8.59876V3.99879C47.3039 3.20339 46.7729 2.67698 45.8733 2.67698C44.8241 2.67698 44.1163 3.39195 44.1026 4.32249V8.59876C44.1026 8.62772 44.0786 8.65153 44.0493 8.65153H42.5484C42.5192 8.65089 42.4951 8.62707 42.4951 8.59812Z" fill="#262626"/>
        <path d="M49.4844 5.03681C49.4844 2.82499 50.8605 1.2876 52.7813 1.2876C53.8512 1.2876 54.7502 1.75866 55.2364 2.49486C55.2637 2.53605 55.3274 2.52125 55.3339 2.47234L55.4463 1.54952C55.4496 1.52313 55.4723 1.50318 55.499 1.50318H56.6924C56.7217 1.50318 56.7457 1.52699 56.7457 1.55595V8.59812C56.7457 8.62707 56.7217 8.65089 56.6924 8.65089H55.2052C55.1759 8.65089 55.1519 8.62707 55.1519 8.59812V7.85098C55.1519 7.79949 55.0862 7.7789 55.0557 7.82008C54.5799 8.4649 53.8031 8.85296 52.8359 8.85296C50.8878 8.85296 49.4844 7.28853 49.4844 5.03681ZM55.1512 5.0233C55.1512 3.60689 54.3342 2.62293 53.1622 2.62293C51.9635 2.62293 51.1322 3.62104 51.1322 5.05033C51.1322 6.49312 51.9492 7.50476 53.1349 7.50476C54.3205 7.50476 55.1512 6.47961 55.1512 5.0233Z" fill="#262626"/>
      </svg>
    </>
  )
}

export function StepSpinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="step-spinner">
      <circle cx="9" cy="9" r="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M9 2a7 7 0 0 1 7 7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function GeminiSparkleStatic() {
  // In ChatPCP the AI message has no sparkle icon — rendered as null
  return null
}

export function GeminiSparkle() {
  return (
    <svg className="gemini-sparkle" width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C14 7.732 7.732 14 0 14C7.732 14 14 20.268 14 28C14 20.268 20.268 14 28 14C20.268 14 14 7.732 14 0Z" fill="#4285f4"/>
    </svg>
  )
}

export function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12">
      <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/>
      <rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor"/>
      <rect x="9" y="2" width="3" height="10" rx="1" fill="currentColor"/>
      <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor"/>
    </svg>
  )
}

export function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
      <path d="M8 9.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM3.2 7.2a6.4 6.4 0 0 1 9.6 0l-1.2 1.2a4.8 4.8 0 0 0-7.2 0L3.2 7.2zM0 4a10.4 10.4 0 0 1 16 0l-1.2 1.2A8.8 8.8 0 0 0 1.2 5.2L0 4z"/>
    </svg>
  )
}

export function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12">
      <rect x="0" y="0" width="22" height="12" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
      <rect x="1.5" y="1.5" width="19" height="9" rx="1" fill="currentColor"/>
      <rect x="23" y="3.5" width="2" height="5" rx="1" fill="currentColor"/>
    </svg>
  )
}
