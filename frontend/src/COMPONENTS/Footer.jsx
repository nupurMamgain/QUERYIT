function Footer() {

  return (

    <footer className="bg-[#1a1919] text-white py-8 px-10">

      <div className="grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>

          <h1 className="text-3xl font-bold text-orange-400"style={{fontFamily:"Söhne"}}>
            Query iT
          </h1>

          <p className="mt-4 text-gray-300">
            AI-powered research assistant for modern web exploration.
          </p>

        </div>

        {/* Links */}
        <div>

          <h2 className="text-xl font-semibold mb-4">
            Quick Links
          </h2>

          <div className="space-y-3 text-gray-300">

            <p>Home</p>
            <p>Features</p>
            <p>Pricing</p>
            <p>About</p>

          </div>

        </div>

        {/* Contact */}
        <div>

          <h2 className="text-xl font-semibold mb-4">
            Contact
          </h2>

          <p className="text-gray-300">
            support@queryit.ai
          </p>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">

        © 2026 Query It. All rights reserved.

      </div>

    </footer>

  )
}

export default Footer