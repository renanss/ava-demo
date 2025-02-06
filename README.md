# AVA Protocol Demo

This is a proof of concept application demonstrating integration with AVA Protocol's Actively Validated Service (AVS). The application allows users to connect their Ethereum wallets and view AVS data.

## Features

- Wallet connection using RainbowKit
- AVS data fetching using ava-sdk-js
- Real-time updates of operator data
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js v20.11.1 or higher
- npm v10.2.4 or higher
- A WalletConnect project ID (get one from https://cloud.walletconnect.com)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd ava-demo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your WalletConnect project ID:
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

4. Start the development server:
```bash
npm run dev
```


## Generate Keys

```bash
docker run -it --rm -v ~/.eigenlayer:/root/.eigenlayer ubuntu:latest bash -c "apt-get update && apt-get install -y curl && curl -sSfL https://raw.githubusercontent.com/layr-labs/eigenlayer-cli/master/scripts/install.sh | sh -s && export PATH=\$PATH:~/bin && echo 'password123' | eigenlayer keys create --key-type ecdsa --insecure test5 && eigenlayer keys show test5"
```

```bash
docker run -it --rm -v ~/.eigenlayer:/root/.eigenlayer ubuntu:latest cat /root/.eigenlayer/operator_keys/test5.ecdsa.key.json
```



5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/providers.tsx` - Wallet connection and provider configuration
- `src/app/page.tsx` - Main application page with AVS data display
- `src/app/layout.tsx` - Root layout component

## Technologies Used

- [Next.js](https://nextjs.org/)
- [RainbowKit](https://www.rainbowkit.com/)
- [wagmi](https://wagmi.sh/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AVA Protocol SDK](https://github.com/AvaProtocol/ava-sdk-js)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 