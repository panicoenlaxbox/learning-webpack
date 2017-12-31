import { foo } from "./lib";
class Bar {
    constructor(public baz: string) {
        console.log(this.baz);
    }
}
var bar = new Bar("Sergio");
foo("Carmen");