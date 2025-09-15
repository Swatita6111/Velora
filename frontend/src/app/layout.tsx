import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Velora',
  description: 'Next.js Velora Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
