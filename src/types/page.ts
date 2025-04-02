
import { Content } from "@/data/mockData";

export interface PageComponent {
  id: string;
  type: string;
  contents?: { [key: string]: Content | null };
  settings?: any;
}
