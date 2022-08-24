//DESAFIO SIMULADO//


// Se determinan por medio de función flecha los % de comisión para cada tipo de operación, días de acreditacion, y tasa financiera
const operTD = () => 8
const diasTD = () => 2
const operTC = () => 12
const diasTC = () => 15
const operQR = () => 2
const diasQR = () => 1
const tasaFin = () => 75


// Función de determinar valor neto de la transacción
function fValorNeto(cTipoOper, nImporte, nOtroDescuento = 0) {

    let nImporteNeto = nImporte - nOtroDescuento // Determino el valor menos otros descuentos aplicables

    switch (cTipoOper) {
        case "TD": // Tarjeta de débito
            return nImporteNeto - (nImporte* (operTD()/100))       
            break;
        case "TC": // Tarjeta de crédito
            return nImporteNeto - (nImporte* (operTC()/100))       
            break;
        case "QR": // Transferencia por QR    
            return nImporteNeto - (nImporte* (operQR()/100))       
            break;
        default:
            console.log("Error en el tipo de operaciones, debe ingresar nuevamente los datos")
            return 0        
            break;
    }
        
}

// Función para calcular el valor actual, es decir, cobrar el importe neto en el dia de hoy
function fValorActual(nValorNeto, cTipoOper) {
    switch (cTipoOper) {
        case "TD":
            return nValorNeto / (( 1 + ((tasaFin()/100)/365))**diasTD())        
            break;
        case "TC":
            return nValorNeto / (( 1 + ((tasaFin()/100)/365))**diasTC())
            break;
        case "QR":
            return nValorNeto / (( 1 + ((tasaFin()/100)/365))**diasQR())
        default:
            console.log("No se pudo operar....")
            return 0
            break;
    }
    
}


// Calcual la cantidad de dias en que se deberia acreditar el dinero para no sufir un descuento
function fDiasSinDescuento(nImporte, nValorNeto, cTipoOper) {
    switch (cTipoOper) {
        case "TD":
            return nImporte/(nValorNeto*(operTD()/365))
            break;
        case "TC":
            return nImporte/(nValorNeto*(operTC()/365))
            break;
        case "QR":
            return nImporte/(nValorNeto*(operQR()/365))
        default:
            console.log("No se pudo operar....")
            return 0
            break;
    }
}

// Carga de la operación

let cTipoOper = prompt ("Ingrese el tipo de operación TC/TD/QR")
let nImporte = Number (prompt("Ingrese valor de la operación:"))
let nDescuento = Number (prompt("Ingrese valor de descuentó"))

let nValorNeto= 0
let cAccionFinanciera= ""

// Se determina el valor a percibir de la operación
console.log("Calculado operaciones importe neto...")
nValorNeto =  fValorNeto (cTipoOper, nImporte, nDescuento)
console.log(`El valor neto a cobrar por la operación es de $: ${nValorNeto}`)
console.log("------------------------------")
console.log("Ud. podra determinar una acción financiera sobre el valor neto a cobrar")
console.log("Seleccionado VA: Determina el valor neto a cobrar en forma inmediata")
console.log("Seleccionado SD: Determina la cantidad de dias que deberán pasar para cobrar su opreación sin descuentos")
console.log("Seleccionado X: Finalizada la operación")
cAccionFinanciera= prompt ("Seleccione VA/SD/X")


while (cAccionFinanciera !== "X" && cAccionFinanciera !== "x" ) {
    
    switch (cAccionFinanciera) {
        case "VA": // Selecciono calcular el valor actual
            console.log(`El importe de acreditación inmediata es: ${fValorActual(nValorNeto, cTipoOper)}`)
            break;
        case "SD": // Cantidad de dias para no sufrir un descuento
            console.log(`Parar maneter el valor operado los fondos se acreditaran a ${fDiasSinDescuento(nImporte, nValorNeto, cTipoOper)}`)
            break;
        default:
            console.log("La opción ingresada no puede ser interpretada...")
            break;
    }

    cAccionFinanciera= prompt ("Seleccione VA/SD/X")
}


console.log("Muchas gracias")


