export interface Compra {
  id?: string;
  producto?: string;
  detalle?: string;
  imagen?: string;
  cantidad?: number;
  precio?: number;
  total?: number;
  estado?: string;
  idVendedor?: string;
  idCliente?: string;
}
