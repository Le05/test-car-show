export function formataMoeda(valor: string|number, tipo: string = "form") {
    if (tipo == "form") {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(valor));
    } else {
        return extrairNumeros(valor);
    }
}

function extrairNumeros(valor: string|number) {
    return valor.toString().replace(/\D/g, '');
}

function mask(value: string, pattern: string) {
    let i: number = 0;
    return pattern.replace(/#/g, () => value[i++] || '');
}