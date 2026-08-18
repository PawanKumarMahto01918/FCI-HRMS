export interface DashboardItem {
  id: string;
  label: string;
  icon: string;           // Ionicons name
  color: string;          // border + icon color
  route: string;          // future navigation target
}

export const dashboardItems: DashboardItem[] = [
  { id: 'attendance',         label: 'Attendance',                      icon: 'time-outline',               color: '#E8832A', route: '/features/attendance'         },
  { id: 'leave',              label: 'Leave',                           icon: 'calendar-outline',            color: '#27AE60', route: '/features/leave-balance'      },
  { id: 'leave_balance',      label: 'Leave Balance\nNew',              icon: 'document-text-outline',       color: '#C0392B', route: '/features/leave-balance'      },
  { id: 'holidays',           label: 'My Holidays',                     icon: 'airplane-outline',            color: '#3498DB', route: '/features/holidays'           },
  { id: 'att_reg',            label: 'Attendance\nRegularization',      icon: 'calendar-number-outline',     color: '#2C3E8C', route: '/features/att-regularization' },
  { id: 'documents',          label: 'Documents/\nLetters\nAttachments',icon: 'attach-outline',              color: '#922B21', route: '/features/documents'          },
  { id: 'directory',          label: 'Directory',                       icon: 'search-outline',              color: '#A0783C', route: '/features/directory'          },
  { id: 'newspaper_reimburse',label: 'Newspaper\nReimburse',            icon: 'newspaper-outline',           color: '#E8832A', route: '/features/newspaper-reimburse'},
  { id: 'travel_reimburse',   label: 'Travel\nReimburse',               icon: 'car-outline',                 color: '#C0392B', route: '/features/travel-reimburse'   },
  { id: 'other_reimburse',    label: 'Other\nReimburse',                icon: 'wallet-outline',              color: '#7D3C98', route: '/features/other-reimburse'    },
  { id: 'policies',           label: 'Policies &\nCirculars',           icon: 'shield-checkmark-outline',    color: '#2980B9', route: '/features/policies'           },
  { id: 'movable_property',   label: 'Movable\nProperty',               icon: 'business-outline',            color: '#27AE60', route: '/features/movable-property'   },
  { id: 'tour_program',       label: 'Tour\nProgram',                   icon: 'map-outline',                 color: '#8E44AD', route: '/features/tour-program'       },
  { id: 'training',           label: 'Training',                        icon: 'school-outline',              color: '#16A085', route: '/features/training'           },
  { id: 'grievance',          label: 'Grievance',                       icon: 'chatbubble-outline',          color: '#E67E22', route: '/features/grievance'          },
];
