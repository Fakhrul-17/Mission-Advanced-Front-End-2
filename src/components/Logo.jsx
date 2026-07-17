function Logo({ variant = "default" }) {
  if (variant === "auth") {
    return (
      <div className="flex items-center">
        <img
          src={`${import.meta.env.BASE_URL}assets/img/logo.jpeg`}
          alt="Logo"
          className="h-6 w-auto object-contain"
        />
      </div>
    )
  }

  return (
    <div className="flex items-center">
      {/* Mobile: clip jadi kotak, tampilkan bagian kiri (icon) */}
      <div className="md:hidden w-7 h-7 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}assets/img/logo.jpeg`}
          alt="Logo"
          className="h-7 w-auto object-cover object-left"
        />
      </div>

      {/* Desktop: full logo */}
      <img
        src={`${import.meta.env.BASE_URL}assets/img/logo.jpeg`}
        alt="Logo Desktop"
        className="hidden md:block h-6 w-auto object-contain"
      />
    </div>
  )
}

export default Logo