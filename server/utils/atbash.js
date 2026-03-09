export default function enAtbash(message) {    

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    let alphabet1 = "abcdefghijklmnopqrstuvwxyz";
    let tebahpla1 = "zyxwvutsrqponmlkjihgfedcba";
    let decoded_string = "";

    for (let i = 0; i < message.length; i++) {
        let coded_letra = message.charAt(i);
        
	if (/[^a-zA-Z]/.test(message[i])) {
		decoded_string = decoded_string+message[i];	
	}
	else if (message[i] === message[i].toUpperCase()) {
	    	let letraPosMayus = alphabet.indexOf(coded_letra);
	    	let tebLetraPosMayus = tebahpla.charAt(letraPosMayus);
	    	decoded_string = decoded_string+tebLetraPosMayus;
        } else {
	    	let letraPosMinus1 = alphabet1.indexOf(coded_letra);
	    	let tebLetraPosMinus1 = tebahpla1.charAt(letraPosMinus1);
	    	decoded_string = decoded_string + tebLetraPosMinus1;
        }

    }
    return decoded_string;
}