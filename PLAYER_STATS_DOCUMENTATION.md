# Player Statistics Feature Documentation

## Tổng quan

Tính năng thống kê cầu thủ chi tiết được phát triển để cung cấp trải nghiệm xem thông tin cầu thủ tương tự như các website bóng đá chuyên nghiệp như FotMob, ESPN, và TransferMarkt.

## Kiến trúc hệ thống

### 1. Cấu trúc dữ liệu (Data Structure)

#### Types định nghĩa trong `src/constants/squash.ts`:

```typescript
// Thống kê chi tiết của cầu thủ
export type PlayerStats = {
  // Thống kê cơ bản
  matchesPlayed: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  
  // Thống kê kỹ thuật
  passAccuracy: number; // %
  passesCompleted: number;
  passesAttempted: number;
  keyPasses: number;
  
  // Thống kê tấn công
  shotsOnTarget: number;
  shotsOffTarget: number;
  shotAccuracy: number; // %
  dribbleSuccess: number; // %
  dribblesCompleted: number;
  dribblesAttempted: number;
  
  // Thống kê phòng ngự
  tackles: number;
  tackleSuccess: number; // %
  interceptions: number;
  clearances: number;
  blocks: number;
  
  // Thống kê thể lực
  sprintSpeed: number; // km/h
  distance: number; // km per game
  stamina: number; // %
  
  // Rating tổng thể
  overallRating: number; // 0-100
  formRating: number; // Recent form 0-100
};

// Thuộc tính kỹ năng (0-100)
export type PlayerAttributes = {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physicality: number;
};

// Thống kê theo mùa giải
export type PlayerCareerStats = {
  season: string;
  stats: PlayerStats;
};

// Player model mở rộng
export type Player = {
  // ... các field cũ
  age: number;
  height: number; // cm
  weight: number; // kg
  nationality: string;
  preferredFoot: 'Left' | 'Right' | 'Both';
  marketValue: number; // in millions
  
  currentStats: PlayerStats;
  attributes: PlayerAttributes;
  careerStats: PlayerCareerStats[];
};
```

### 2. Components Structure

#### Core Components:

1. **PlayerInfoCard** - Hiển thị thông tin cơ bản
2. **AttributesRadarChart** - Biểu đồ radar cho kỹ năng
3. **StatsBarChart** - Biểu đồ cột cho thống kê mùa giải
4. **CareerStatsChart** - Biểu đồ line cho xu hướng sự nghiệp
5. **AnimatedCounter** - Animation cho số liệu
6. **ProgressBar** - Thanh tiến trình có animation

#### Utility Components:

1. **PlayerDetailsSkeleton** - Loading state
2. **ChartSkeleton** - Loading cho biểu đồ

## Routing và Navigation

### Dynamic Route: `/player/[id]`

```
src/app/player/[id]/
├── page.tsx          # Main player detail page
├── layout.tsx        # SEO metadata và layout
├── loading.tsx       # Loading UI
└── not-found.tsx     # 404 page
```

#### Navigation Flow:
1. User nhấn "View Details" trên Card component
2. Navigate to `/player/{playerId}`
3. Page tự động tìm player theo ID
4. Hiển thị 404 nếu không tìm thấy

## Features Implementation

### 1. Biểu đồ và Visualizations

#### Radar Chart (Thuộc tính cầu thủ):
- Sử dụng Chart.js với react-chartjs-2
- Animation: 2s easeInOutQuart
- Color scheme: Blue gradient
- Interactive tooltips

#### Bar Chart (Thống kê mùa giải):
- Animated bars với staggered delay
- Color-coded theo loại thống kê
- Responsive design

#### Line Chart (Xu hướng sự nghiệp):
- Multiple datasets (Goals, Assists, Rating)
- Dual Y-axis
- Trend indicators
- Smooth animations

### 2. Animations và Micro-interactions

#### Framer Motion Animations:
```typescript
// Hero section animation
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Staggered content animation
transition={{ delay: 0.9 + index * 0.1 }}

// Chart loading animation
animate={{ scale: [0.8, 1], opacity: [0, 1] }}
```

#### Counter Animation:
```typescript
const count = useMotionValue(0);
const rounded = useTransform(count, (latest) => Math.round(latest));
animate(count, value, { duration: 2 });
```

### 3. Performance Optimizations

#### Lazy Loading:
```typescript
const AttributesRadarChart = lazy(() => 
  import('@/components/PlayerStats/AttributesRadarChart')
    .then(module => ({ default: module.AttributesRadarChart }))
);
```

#### Code Splitting:
- Charts được lazy load
- Suspense fallback với skeleton
- Memoized components

#### SEO Optimization:
- Dynamic metadata generation
- OpenGraph tags
- Structured data ready

## UX/UI Design Principles

### 1. Visual Hierarchy
- Hero section với player image và quick stats
- Section-based layout với clear separation
- Color-coded indicators cho different stats

### 2. Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly interactions

### 3. Loading States
- Skeleton screens
- Progressive loading
- Smooth transitions

### 4. Accessibility
- Semantic HTML structure
- Keyboard navigation
- Screen reader friendly
- High contrast ratios

## Testing Strategy

### 1. Unit Tests (Recommended)
```typescript
// Test player data loading
describe('PlayerDetailPage', () => {
  it('should load player correctly', () => {
    // Test implementation
  });
  
  it('should show 404 for invalid ID', () => {
    // Test implementation
  });
});
```

### 2. Integration Tests
- Chart rendering
- Navigation flow
- Animation performance

### 3. E2E Tests
- Full user journey
- Performance metrics
- Cross-browser compatibility

## Development Setup

### 1. Dependencies
```json
{
  "chart.js": "^4.x",
  "react-chartjs-2": "^5.x",
  "framer-motion": "^10.x",
  "chartjs-adapter-date-fns": "^3.x",
  "date-fns": "^2.x"
}
```

### 2. Installation
```bash
yarn add chart.js react-chartjs-2 framer-motion chartjs-adapter-date-fns date-fns
```

### 3. Usage
```typescript
import { PlayerStatsModal } from '@/components/PlayerStats';

// For detail page
<Link href={`/player/${playerId}`}>View Details</Link>
```

## Best Practices

### 1. Code Organization
- Feature-based folder structure
- Index.ts exports for clean imports
- TypeScript strict mode

### 2. Performance
- Lazy loading for heavy components
- Memoization where appropriate
- Efficient re-renders

### 3. Maintenance
- Consistent naming conventions
- Comprehensive type definitions
- Modular component design

## Future Enhancements

### 1. Planned Features
- Player comparison tool
- Statistical trends analysis
- Video highlights integration
- Social sharing

### 2. Technical Improvements
- Virtualization for large datasets
- WebGL charts for better performance
- Real-time data updates
- Offline support

### 3. UX Enhancements
- Advanced filtering
- Customizable dashboard
- Export capabilities
- Personalization

## Troubleshooting

### Common Issues:

1. **Chart không hiển thị**
   - Kiểm tra Chart.js registration
   - Verify data format
   - Check browser console for errors

2. **Animation lag**
   - Reduce animation duration
   - Use transform properties
   - Enable hardware acceleration

3. **TypeScript errors**
   - Update chart type definitions
   - Use proper type assertions
   - Check component props

### Performance Monitoring:
- Use React DevTools Profiler
- Monitor bundle size
- Check Lighthouse scores
- Test on low-end devices

## Conclusion

Tính năng Player Statistics đã được implemented với:
- ✅ Modern tech stack (Next.js 15, React 19, TypeScript)
- ✅ Professional-grade animations và interactions
- ✅ Responsive design với mobile-first approach
- ✅ Performance optimizations (lazy loading, code splitting)
- ✅ SEO-friendly với dynamic metadata
- ✅ Clean architecture và maintainable code
- ✅ Comprehensive type safety

Kết quả là một tính năng tương đương với các website bóng đá chuyên nghiệp, sẵn sàng cho production và dễ dàng mở rộng trong tương lai.
