
export const getPlaceColor = (place: number) => {
  switch (true) {
    case 500000 < place: return '#7442F4';
    case 400000 < place: return '#46BDC6';
    case 300000 < place: return '#34A752';
    case 200000 < place: return '#FBBC06';
    case 100000 < place: return '#EA4235';
    default: return '#26B5FF';
  }
};

export const getPlaceName = (place: number) => {
  switch (true) {
    case 500000 < place: return 'WORLD';
    case 400000 < place: return 'GIMMICK';
    case 300000 < place: return 'SHADER';
    case 200000 < place: return 'TOOL';
    case 100000 < place: return 'AVATER';
    default: return 'OFFICIAL';
  }
};
