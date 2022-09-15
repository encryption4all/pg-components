export interface AttributeType {
    ident: string;
    type: string;
    options?: string[];
    img?: string;
    placeholder?: string;
}

export const ALLOWED_ATTRIBUTE_TYPES: { [key: string]: AttributeType[] } = {
    mobile: [
        {
            ident: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber',
            type: 'string',
            img: 'phone',
            placeholder: '+31612345678'
        }
    ],
    personalData: [
        //{ ident: 'pbdf.gemeente.personalData.initials', type: 'string' },
        //{ ident: 'pbdf.gemeente.personalData.firstnames', type: 'string' },
        //{ ident: 'pbdf.gemeente.personalData.prefix', type: 'string' },
        //{ ident: 'pbdf.gemeente.personalData.familyname', type: 'string', img: 'personal' },
        //{ ident: 'pbdf.gemeente.personalData.fullname', type: 'string', img: 'personal' },
        //{ ident: 'pbdf.gemeente.personalData.gender', type: 'string', options: ['M', 'V'] },
        //{ ident: 'pbdf.gemeente.personalData.nationality', type: 'string' },
        { ident: 'pbdf.gemeente.personalData.surname', type: 'string', img: 'personal' },
        {
            ident: 'pbdf.gemeente.personalData.dateofbirth',
            type: 'string',
            img: 'calendar',
            placeholder: 'DD-MM-YYYY'
        }
        //{ ident: 'pbdf.gemeente.personalData.cityofbirth', type: 'string' },
        //{ ident: 'pbdf.gemeente.personalData.countryofbirth', type: 'string' },
        //{ ident: 'pbdf.gemeente.personalData.over12', type: 'boolean' },
        //{ ident: 'pbdf.gemeente.personalData.over16', type: 'boolean' },
        //{ ident: 'pbdf.gemeente.personalData.over18', type: 'boolean', img: 'calendar' }
        //{ ident: 'pbdf.gemeente.personalData.over21', type: 'boolean' },
        //{ ident: 'pbdf.gemeente.personalData.over65', type: 'boolean' }
        //{ ident: 'pbdf.gemeente.personalData.bsn', type: 'string' },
        //{
        //    ident: 'pbdf.gemeente.personalData.digidlevel',
        //    type: 'string',
        //    options: ['Basis', 'Midden', 'Substantieel', 'Hoog']
        //}
    ],
    education: [{ ident: 'pbdf.pbdf.surfnet-2.id', type: 'string', img: 'education' }],
    health: [
        {
            ident: 'pbdf.nuts.agb.agbcode',
            type: 'string',
            img: 'health',
            placeholder: '90012345'
        }
    ]
};
