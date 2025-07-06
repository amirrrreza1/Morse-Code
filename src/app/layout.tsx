import { ModeProvider } from "@/Contex/ModeContext";
import "./globals.css";
import CheatSheetModal from "@/Components/CheatSheetModal/CheatSheetModal";
import ModeSwitcher from "@/Components/ModeSwitcher/ModeSwitcher";
import { ToastProvider } from "@/Components/Toast/Toast";

export const metadata = {
  title: "Morse Code",
  description:
    "Morse Code is a method of encoding text into a series of dots and dashes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-gray-50">
        <ToastProvider>
          <ModeProvider>
            <CheatSheetModal />

            <div className="w-[95%] max-w-lg h-[50px] mx-auto flex justify-around border-b bg-black fixed  right-1/2 top-2.5 z-40 translate-x-1/2 shadow-lg">
              <ModeSwitcher />
            </div>

            {children}
          </ModeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
