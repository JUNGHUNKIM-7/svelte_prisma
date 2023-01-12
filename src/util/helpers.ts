interface Form {
    email: string;
    password?: string;
}

interface Address {
    street: string
    city: string
    state: string
    zip: string
}

export interface Register extends Form {
    name?: string;
    address?: Address;
}

export interface Login extends Form { }

export function parseToObject(formData: FormData, address?: Address): Register {
    const fields = {} as Register;
    const defaultMap: Address = {
        street: "",
        city: "",
        state: "",
        zip: ""
    }
    fields['address'] = address ? address : defaultMap
    for (let [k, v] of [...formData]) {
        if (!(k in fields)) {
            switch (k) {
                case 'email':
                    fields[k as keyof Pick<Register, 'email'>] = ""
                case 'password':
                    fields[k as keyof Pick<Register, 'password'>] = ""
            };
        }
        switch (k) {
            case 'email':
                fields[k as keyof Pick<Register, 'email'>] = String(v);
            case 'password':
                fields[k as keyof Pick<Register, 'password'>] = String(v);
        }
    }
    return fields;
}
