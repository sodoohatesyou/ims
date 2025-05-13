import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeGeneratorProps {
  value: string;
  width?: number;
  height?: number;
  format?: string;
}

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({
  value,
  width = 2,
  height = 100,
  format = 'CODE128',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && value) {
      // Clear previous barcode before rendering a new one
      svgRef.current.innerHTML = '';
      JsBarcode(svgRef.current, value, {
        format,
        width,
        height,
        displayValue: true,
      });
    }
  }, [value, width, height, format]);

  return <svg ref={svgRef}></svg>;
};

export default BarcodeGenerator;