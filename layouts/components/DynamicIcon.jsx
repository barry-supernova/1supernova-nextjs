import { useEffect, useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';

// Icons currently used in content are bundled directly so they render on the
// server with no extra JS. Add new CMS icons here to keep them in the bundle.
const bundledIcons = {
  FaRegStar,
  IoDocumentTextOutline,
  LuUsers,
};

// Any other icon name falls back to lazy-loading its whole library on the
// client. Each library is its own chunk (hundreds of KB), so this only costs
// visitors on pages that actually use an un-bundled icon. The `react-icons-lazy`
// alias (next.config.js) keeps these from un-tree-shaking the imports above.
const iconLibraries = {
  fa: [
    () => import('react-icons-lazy/fa/index.js'),
    () => import('react-icons-lazy/fa6/index.js'),
  ],
  fc: [() => import('react-icons-lazy/fc/index.js')],
  io: [() => import('react-icons-lazy/io5/index.js')],
  ai: [() => import('react-icons-lazy/ai/index.js')],
  bs: [() => import('react-icons-lazy/bs/index.js')],
  fi: [() => import('react-icons-lazy/fi/index.js')],
  ri: [() => import('react-icons-lazy/ri/index.js')],
  tb: [() => import('react-icons-lazy/tb/index.js')],
  tfi: [() => import('react-icons-lazy/tfi/index.js')],
  lu: [() => import('react-icons-lazy/lu/index.js')],
};

const DynamicIcon = ({ icon, ...props }) => {
  const [LoadedIcon, setLoadedIcon] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const BundledIcon = bundledIcons[icon];

  useEffect(() => {
    if (BundledIcon || !icon) return;
    let cancelled = false;

    const loadIcon = async () => {
      for (const load of iconLibraries[getIconLibraryKey(icon)] || []) {
        const library = await load();
        if (library[icon]) {
          if (!cancelled) setLoadedIcon(() => library[icon]);
          return;
        }
      }
      if (!cancelled) setNotFound(true);
    };

    loadIcon();
    return () => {
      cancelled = true;
    };
  }, [icon, BundledIcon]);

  const Icon = BundledIcon || LoadedIcon;

  if (Icon) return <Icon {...props} />;
  if (notFound || !icon) {
    return <span className="text-sm">Icon not found</span>;
  }
  return null;
};

const getIconLibraryKey = (icon) => {
  const firstUpper = [...icon].findIndex(
    (letter, i) => i > 0 && letter === letter.toUpperCase()
  );
  return firstUpper > 0 ? icon.slice(0, firstUpper).toLowerCase() : '';
};

export default DynamicIcon;
