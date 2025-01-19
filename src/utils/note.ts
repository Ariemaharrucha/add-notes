export interface INotes {
  id: number;
  title: string;
  note_content: string;
  date: string;
  archived: boolean;
  user_id?: string;
}
