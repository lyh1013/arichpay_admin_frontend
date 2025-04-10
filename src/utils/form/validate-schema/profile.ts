export const validationSchema: Record<string, string> = {
  email: 'required|email',
  tel: 'required',
  invoice_address: 'required',
  delivery_address: 'required',
  file: 'required',
  password_confirmation: 'confirmed:@password',
}
