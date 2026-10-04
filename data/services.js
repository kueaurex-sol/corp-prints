// Source: client-provided service catalog. Flex Printing's three types had
// no description in the table — short descriptions were drafted for those
// only; everything else is copied as given.
const slugify = (s) =>
  s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const RAW = [
  {
    category: "Flex Printing",
    types: [
      { name: "Flex Banners", description: "Durable flex banners for storefronts and events." },
      { name: "Hoardings", description: "Large-format flex hoardings for outdoor advertising." },
      { name: "Event & Promotional Banners", description: "Flex banners for events, launches and promotions." },
    ],
  },
  {
    category: "Vinyl Printing",
    types: [
      { name: "Self-Adhesive Vinyl Graphics", description: "Adhesive-backed vinyl prints for surfaces." },
      { name: "Interior Wall Graphics", description: "Vinyl graphics applied to interior/exterior walls." },
      { name: "Glass & Window Graphics", description: "Vinyl graphics for glass and window surfaces." },
      { name: "Automotive Graphics", description: "Vinyl wraps and graphics for vehicles." },
      { name: "Floor Graphics", description: "Vinyl graphics for floor branding/wayfinding." },
      { name: "In-Store Branding", description: "Vinyl-based in-store branding elements." },
    ],
  },
  {
    category: "UV Printing (with White)",
    types: [
      { name: "Fabric Printing", description: "UV printing on fabric substrates." },
      { name: "Acrylic Printing", description: "UV printing on acrylic substrates." },
      { name: "SunBoard Printing", description: "UV printing on SunBoard substrates." },
      { name: "Flute Printing", description: "UV printing on flute board substrates." },
      { name: "Laminate Printing", description: "UV printing on laminate substrates." },
      { name: "Glass Printing", description: "UV printing on glass substrates." },
      { name: "ACP", description: "UV printing on Aluminium Composite Panel." },
      { name: "UV Vinyl Printing", description: "UV process applied to vinyl material." },
      { name: "UV Flex Printing", description: "UV process applied to flex material." },
    ],
  },
  {
    category: "Branding Solutions",
    types: [
      { name: "Facade Branding", description: "Branding treatments for building facades." },
      { name: "Aluminum Frame Installations", description: "Installation of aluminium frame structures for branding." },
      { name: "Canter Van Display Printing", description: "Printed display branding for canter vans." },
      { name: "Cluster Displays & Cube Boxes", description: "Cluster display units and cube box branding." },
    ],
  },
  {
    category: "Signage & Display Systems",
    types: [
      { name: "Acrylic Sign Boards", description: "LED-lit, edge-glow or embossed acrylic signboards." },
      { name: "LED & Glow Sign Boards", description: "Illuminated LED and glow sign boards." },
      { name: "Liquid Acrylic Fabricated Signage", description: "Signage fabricated using liquid acrylic." },
      { name: "Window Concepts & Visual Merchandising", description: "Window display concepts and visual merchandising setups." },
      { name: "Arches Installation & Lighting Works", description: "Arch structures with lighting installation." },
      { name: "MS Frame Fabrication & Look Walkers", description: "Mild steel frame fabrication, drop-downs and look walkers." },
    ],
  },
  {
    category: "Laser Cutting",
    types: [
      { name: "Acrylic Signage Cuttings", description: "Laser-cut acrylic pieces for signage." },
      { name: "Interior Designer Cuttings", description: "Laser cutting for interior design elements." },
      { name: "Miniature Model Cuttings", description: "Laser-cut miniature/architectural models." },
      { name: "Gifts & Crafts Cutting", description: "Laser-cut gift and craft items." },
    ],
  },
  {
    category: "CNC Cutting",
    types: [
      { name: "Door Carvings", description: "CNC-carved decorative doors." },
      { name: "MDF & WPVC Cutting", description: "CNC cutting on MDF and WPVC boards." },
      { name: "Intricate Furniture Panels", description: "CNC-cut detailed furniture panels." },
      { name: "Wood Engraving", description: "CNC wood engraving." },
      { name: "Metal CNC", description: "CNC cutting on metal sheets." },
    ],
  },
];

export const SERVICES = RAW.map((cat) => ({
  slug: slugify(cat.category),
  name: cat.category,
  types: cat.types.map((t) => ({ slug: slugify(t.name), name: t.name, description: t.description })),
}));

export function getCategory(slug) {
  return SERVICES.find((c) => c.slug === slug);
}

export function getType(categorySlug, typeSlug) {
  const cat = getCategory(categorySlug);
  if (!cat) return null;
  const type = cat.types.find((t) => t.slug === typeSlug);
  return type ? { ...type, category: cat } : null;
}