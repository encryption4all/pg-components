export interface AttributeType {
    ident: string;
    type: string;
    options?: string[];
    img?: string;
    placeholder?: string;
    pattern?: string;
}

export const ALLOWED_ATTRIBUTE_TYPES: { [key: string]: AttributeType[] } = {
    mobile: [
        {
            ident: 'irma-demo.sidn-pbdf.mobilenumber.mobilenumber',
            type: 'string',
            img: 'phone',
            placeholder: '+31612345678',
            pattern: String.raw`^\+[0-9]{0,4}6[0-9]{8}$`
        }
    ],
    personalData: [
        { ident: 'irma-demo.gemeente.personalData.surname', type: 'string', img: 'personal' },
        {
            ident: 'irma-demo.gemeente.personalData.dateofbirth',
            type: 'string',
            img: 'calendar',
            placeholder: 'DD-MM-YYYY',
            pattern: String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`
        }
        //{ ident: 'irma-demo.gemeente.personalData.cityofbirth', type: 'string' },
        //{ ident: 'irma-demo.gemeente.personalData.countryofbirth', type: 'string' },
        //{ ident: 'irma-demo.gemeente.personalData.over12', type: 'boolean' },
        //{ ident: 'irma-demo.gemeente.personalData.over16', type: 'boolean' },
        //{ ident: 'irma-demo.gemeente.personalData.over18', type: 'boolean', img: 'calendar' }
        //{ ident: 'irma-demo.gemeente.personalData.over21', type: 'boolean' },
        //{ ident: 'irma-demo.gemeente.personalData.over65', type: 'boolean' }
        //{ ident: 'irma-demo.gemeente.personalData.bsn', type: 'string' },
        //{
        //    ident: 'irma-demo.gemeente.personalData.digidlevel',
        //    type: 'string',
        //    options: ['Basis', 'Midden', 'Substantieel', 'Hoog']
        //}
    ],
    // education: [{ ident: 'irma-demo.pbdf.surfnet-2.id', type: 'string', img: 'education' }],
    health: [
        {
            ident: 'irma-demo.nuts.agb.agbcode',
            type: 'string',
            img: 'health',
            placeholder: '90012345'
        }
    ]
};
