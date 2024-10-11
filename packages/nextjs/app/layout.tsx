import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import Sidebar from "~~/components/Sidebar";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className="flex">
        {/* Sidebar */}
        <Sidebar />
        <ThemeProvider enableSystem>
          {/* Main content */}
          <div className="flex-1 max-w-screen-xl ml-auto w-full ">
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
