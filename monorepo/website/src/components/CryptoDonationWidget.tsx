import { type FC, useState } from 'react';
import ContentCopyIcon from '~icons/material-symbols/content-copy-outline';

type CryptoAddresses = {
    btc: string;
    eth: string;
};

type CryptoDonationWidgetProps = {
    addresses: CryptoAddresses;
};

export const CryptoDonationWidget: FC<CryptoDonationWidgetProps> = ({ addresses }) => {
    const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth'>('btc');
    const [buttonText, setButtonText] = useState('Copy');

    const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCrypto(event.target.value as 'btc' | 'eth');
    };

    const handleCopyAddress = async () => {
        try {
            await navigator.clipboard.writeText(addresses[selectedCrypto]);
            setButtonText('Copied!');
            setTimeout(() => {
                setButtonText('Copy');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy address:', err);
        }
    };

    return (
        <div className="my-3 p-3 border border-gray-200 rounded bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
                <label htmlFor="crypto-select" className="text-sm text-gray-600">
                    Currency:
                </label>
                <select
                    id="crypto-select"
                    value={selectedCrypto}
                    onChange={handleCryptoChange}
                    className="px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-400"
                >
                    <option value="btc">BTC</option>
                    <option value="eth">ETH</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
         <span className="text-sm text-gray-600">
            Address:
            </span>
                <code className="flex-1 p-2 bg-white border border-gray-200 rounded text-xs break-all font-mono text-gray-700">
                    {addresses[selectedCrypto]}
                </code>
                <button
                    onClick={handleCopyAddress}
                    className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                >
                    <ContentCopyIcon className="w-3 h-3" />
                    <span className="text-xs">{buttonText}</span>
                </button>
            </div>
        </div>
    );
};