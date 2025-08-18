// src/components/ui/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';

// Lista linków, które pojawią się w nawigacji
const navLinks = [
  { to: '/artist', label: 'Panel Artysty' },
  { to: '/author', label: 'Panel Autora' },
  { to: '/instructor', label: 'Panel Instruktora' },
  { to: '/admin', label: 'Panel Admina' },
  { to: '/music-publishing', label: 'Music Publishing' },
  { to: '/digital-publishing', label: 'Digital Publishing' },
  { to: '/e-learning', label: 'E-Learning' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/product-details', label: 'Product Details' },
  { to: '/profile', label: 'Profil' },
  { to: '/payments', label: 'Payment History' },
  { to: '/subscription', label: 'Subscription Management' },
];

function Navbar() {
  const location = useLocation();

  const navStyles = {
    padding: '1rem',
    backgroundColor: 'hsl(var(--background))',
    borderBottom: '1px solid hsl(var(--border))',
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  };

  const getLinkStyles = (path: string) => ({
    color: location.pathname.startsWith(path) ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
    backgroundColor: location.pathname.startsWith(path) ? 'hsl(var(--primary))' : 'transparent',
    textDecoration: 'none',
    fontWeight: location.pathname.startsWith(path) ? 'bold' : 'normal',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
  });

  return (
    <nav style={navStyles}>
      {navLinks.map(link => (
        <Link key={link.to} to={link.to} style={getLinkStyles(link.to)}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;