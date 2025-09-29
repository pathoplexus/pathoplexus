import { af as DEFAULT_LOCALE } from './config_CQtV1zSN.mjs';

const formatNumberWithDefaultLocale = (num) => new Intl.NumberFormat(DEFAULT_LOCALE).format(num);

export { formatNumberWithDefaultLocale as f };
