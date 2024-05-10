import { ExcelData, SeedProduct } from "./seed-data";

import * as xlsx from 'xlsx';



function transformData(data: ExcelData[]) : SeedProduct[]{
    return data.map((item) => ({
        handle: item.Handle.toLowerCase(),
        title: item.Title,
        description: item.Description,
        sku: String(item.SKU),
        grams: parseFloat(item.Grams),
        stock: Number(item.Stock),
        price: parseFloat(item.Price),
        compare_price: parseFloat(item['Compare Price']),
        barcode: item.Barcode ? String(item.Barcode) : '',
        userId: '',
    }));
}

export const readProductsFromExcel = async (filePath): Promise<SeedProduct[]> => {
    try {
        const path = 'src/seed/data';
        const workbook = xlsx.readFile(`${path}/${filePath}`);
        let data: SeedProduct[] = [];

        const sheets = workbook.SheetNames;
        for (let i = 0; i < sheets.length; i++) {
            const sheet = workbook.Sheets[sheets[i]];
            
            const sheetData: ExcelData[] = xlsx.utils.sheet_to_json(sheet);
            
            const transformedData = transformData(sheetData);
            
            data.push(...transformedData);
        }
        return data;
    }
    catch (err) {
        console.error('Error al leer el archivo Excel:', err);
        throw err;
    }
}