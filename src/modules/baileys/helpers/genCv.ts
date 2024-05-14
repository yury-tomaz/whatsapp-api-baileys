interface GenerateVCInput {
  fullName: string;
  organization: string;
  phoneNumber: string;
}

export const generateVC = (input: GenerateVCInput) =>
  `BEGIN:VCARD
VERSION:3.0
FN:${input.fullName}
ORG:${input.organization};
TEL;type=CELL;type=VOICE;waid=${input.phoneNumber}:${input.phoneNumber}
END:VCARD`;
