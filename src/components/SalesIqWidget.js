import { useEffect } from 'react';

export default function SalesIqWidget() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Prevent duplicate loader
    if (document.getElementById('zsiqscript')) return;

    const inline = document.createElement('script');
    inline.type = 'text/javascript';
    inline.text =
      "window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}};";

    const external = document.createElement('script');
    external.id = 'zsiqscript';
    external.type = 'text/javascript';
    external.src =
      'https://salesiq.zohopublic.com/widget?wc=siq6c7caf10ab5558239b53ad29eb5d9801ab28f7cdd7b035124a54dee0b79f78f5e53880139d0b43526df2e43b1a0a42e3';
    external.defer = true;

    document.body.appendChild(inline);
    document.body.appendChild(external);
  }, []);

  return null;
}
