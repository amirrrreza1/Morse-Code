import { ModeProvider } from "@/Contex/ModeContext";
import "./globals.css";
import CheatSheetModal from "@/Components/CheatSheetModal/CheatSheetModal";
import ModeSwitcher from "@/Components/ModeSwitcher/ModeSwitcher";

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
        <ModeProvider>
          <CheatSheetModal />

          <div className="w-full flex justify-center py-4 border-b bg-white sticky top-0 z-40">
            <ModeSwitcher />
          </div>

          <div className="p-4">{children}</div>
        </ModeProvider>
      </body>
    </html>
  );
}
