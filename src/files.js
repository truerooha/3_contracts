export const getImageSrc = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return require('@/assets/icons/pdf.svg');
      case 'jpg':
        return require('@/assets/icons/jpg.svg');
      case 'xls':
        return require('@/assets/icons/xls.svg');
      case 'group':
        return require('@/assets/icons/group.svg');
      case 'draft':
        return require('@/assets/icons/draft.svg');
      default:
        return require('@/assets/icons/default.svg');
    }
  };