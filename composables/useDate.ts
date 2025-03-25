export function useDate() {
  // Конвертация даты формата dd.mm.yyyy hh:mm:ss в формат ISO
  const formatToISO = (dateString: string): string => {
    if (!dateString) return '';

    try {
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('.');

      return `${year}-${month}-${day}T${timePart || '00:00:00'}`;
    } catch (e) {
      console.error('Ошибка при форматировании даты:', e);
      return '';
    }
  };

  // Форматирование даты ISO в локальный формат dd.mm.yyyy
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    } catch (e) {
      console.error('Ошибка при форматировании даты:', e);
      return '';
    }
  };

  return {
    formatToISO,
    formatDate,
  };
}
