export interface Column {
  name: string;
  dataKey: string;
  position?: 'right' | 'left';
  isSortable?: boolean;
}
