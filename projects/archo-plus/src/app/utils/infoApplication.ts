//Форма образования
// 1 Б/C Б 4
// 2 Б/C К 2
// 3 СПО Б 4
// 4 СПО К 2
// 5 М Б 2
// 6 М К 2
// 7 А Б 1
// 8 А К 1

export const getLocInArc = (archiveNumber: number) => {
  const formEducationKey = Math.floor(archiveNumber / 100000) as
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8;
  const formEducation = formEducationEnum[formEducationKey];
  const box = Math.floor((archiveNumber % 100000) / 1000);
  const rack =
    formEducation.value + Math.ceil((formEducation.count / 32) * box);
  const paperwork = Math.floor(archiveNumber % 1000);

  return { formEducation, rack, box, paperwork } as locArcInterface;
};

const formEducationEnum = {
  1: { count: 4, value: 0, text: 'Б/C-Б' },
  2: { count: 2, value: 4, text: 'Б/C-К' },
  3: { count: 4, value: 6, text: 'СПО-Б' },
  4: { count: 2, value: 10, text: 'СПО-К' },
  5: { count: 2, value: 12, text: 'Маг-Б' },
  6: { count: 2, value: 14, text: 'Маг-К' },
  7: { count: 1, value: 16, text: 'Асп-Б' },
  8: { count: 1, value: 17, text: 'Асп-К' },
} as const;

export interface locArcInterface {
  formEducation: {
    count: number;
    value: number;
    text: string;
  };
  rack: number;
  box: number;
  paperwork: number;
}
