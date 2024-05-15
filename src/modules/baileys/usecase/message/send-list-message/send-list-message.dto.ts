export interface SendListMessageUseCaseDto {
  id: string;
  to: string;
  text: string;
  buttonText: string;
  title: string;
  description: string;
  sections: SectionMessageList[];
}

interface SectionMessageList {
  title: string;
  rows: RowSectionMessageList[];
}

interface RowSectionMessageList {
  title: string;
  description: string;
  rowId: string;
}
