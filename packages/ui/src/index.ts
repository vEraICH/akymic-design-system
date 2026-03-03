// Core primitives
export { Button, type ButtonProps } from "./button";
export { Input, type InputProps } from "./input";
export { Textarea, type TextareaProps } from "./textarea";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
export { Divider, type DividerProps } from "./divider";

// Feedback
export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertVariant,
} from "./alert";
export {
  toast,
  Toaster,
  type ToastOptions,
  type ToastVariant,
} from "./toast";

// Overlays (portal-based)
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  type DialogProps,
  type DialogContentProps,
} from "./dialog";

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  type DrawerProps,
  type DrawerContentProps,
  type DrawerSide,
} from "./drawer";

export { PopoverPanel, type PopoverPanelProps } from "./popover";

// Data display
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableBodyProps,
  type TableHeadProps,
  type SortDirection,
} from "./table";

export { Pagination, type PaginationProps } from "./pagination";
export { FilterBar, type FilterBarProps, type FilterChip } from "./filter-bar";

// Form inputs
export { Select, type SelectProps, type SelectOption } from "./select";
export { Combobox, type ComboboxProps } from "./combobox";
export { MultiSelect, type MultiSelectProps } from "./multi-select";
export { DatePicker, type DatePickerProps } from "./date-picker";
export { FileUpload, type FileUploadProps } from "./file-upload";

// Calendar
export {
  Calendar,
  CalendarMiniMonth,
  CalendarMonthGrid,
  CalendarToolbar,
  CalendarDayCell,
  CalendarEventChip,
  type CalendarEvent,
  type CalendarView,
  type CalendarEventColor,
  type CalendarProps,
  type CalendarMiniMonthProps,
  type CalendarMonthGridProps,
  type CalendarToolbarProps,
  type CalendarDayCellProps,
  type CalendarEventChipProps,
} from "./calendar";

// Selection controls
export {
  Checkbox,
  CheckboxField,
  type CheckboxProps,
  type CheckboxFieldProps,
} from "./checkbox";

export {
  RadioGroup,
  Radio,
  type RadioGroupProps,
  type RadioProps,
} from "./radio";

export {
  Switch,
  SwitchField,
  type SwitchProps,
  type SwitchFieldProps,
} from "./switch";

// Navigation
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from "./tabs";

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbList,
  type BreadcrumbProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbSegment,
  type BreadcrumbListProps,
} from "./breadcrumb";

// Overlays
export {
  Tooltip,
  type TooltipProps,
  type TooltipPlacement,
} from "./tooltip";

export {
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  type DropdownMenuProps,
  type DropdownItemProps,
} from "./dropdown";

// Promoted primitives
export { Badge, type BadgeProps, type BadgeVariant } from "./badge";

export {
  Skeleton,
  type SkeletonProps,
  Spinner,
  type SpinnerProps,
  type SpinnerSize,
} from "./skeleton";

export { EmptyState, type EmptyStateProps } from "./empty-state";

// Compound elements
export { DashboardLayout, type DashboardLayoutProps } from "./dashboard-layout";

export {
  DashboardPanel,
  type DashboardPanelProps,
  type DashboardPanelAction,
} from "./dashboard-panel";

export { DashboardSkeleton, type DashboardSkeletonProps } from "./dashboard-skeleton";

// Utilities
export { cn } from "./lib/utils";
