export const EMAIL = 'pbdf.sidn-pbdf.email.email'

const personal =
    "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.889 4.875c-.49 0-.889.4-.889.893v4.464c0 .492.399.893.889.893h6.222c.49 0 .889-.4.889-.893V5.768a.892.892 0 0 0-.889-.893H4.89ZM6 8.446h.889c.614 0 1.111.5 1.111 1.116 0 .123-.1.224-.222.224H5.11a.223.223 0 0 1-.222-.224c0-.616.497-1.116 1.111-1.116Zm1.333-1.339A.892.892 0 0 1 6.444 8c-.49 0-.888-.4-.888-.893 0-.492.398-.893.888-.893s.89.4.89.893Zm1.778-.446h1.778a.223.223 0 0 1 0 .446H9.11a.223.223 0 0 1 0-.446Zm0 .893h1.778a.223.223 0 0 1 0 .446H9.11a.223.223 0 0 1 0-.446Zm0 .892h1.778a.223.223 0 0 1 0 .447H9.11a.223.223 0 0 1 0-.447Z' fill='%23fff'/%3E%3C/svg%3E"

export const ALLOWED_ATTRIBUTE_TYPES: { [key: string]: AttributeType[] } = {
    mobile: [
        {
            ident: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber',
            type: 'string',
            img: "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.17 9.818C4.381 8.036 3.246 5.765 4.59 4.414c.029-.03.059-.06.103-.089.512-.379.987-.468 1.3-.015l.942 1.329c.319.453.252.727-.104 1.091l-.297.32c-.096.103-.06.237-.015.326.156.26.527.72.95 1.143.43.43.876.787 1.143.95.104.06.26.074.342-.015l.304-.297c.342-.341.639-.415 1.091-.104.616.438.995.698 1.351.958.446.334.35.854.008 1.24-.045.051-.082.103-.134.155-1.343 1.344-3.622.208-5.404-1.588Z' fill='%23fff'/%3E%3C/svg%3E",
            placeholder: '+31612345678',
            pattern: String.raw`^\+[0-9]{0,4}6[0-9]{8}$`
        }
    ],
    personalData: [
        {
            ident: 'pbdf.gemeente.personalData.surname',
            type: 'string',
            img: personal
        },
        {
            ident: 'pbdf.gemeente.personalData.dateofbirth',
            type: 'string',
            img: personal,
            placeholder: 'DD-MM-YYYY',
            pattern: String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`
        }
        // { ident: 'pbdf.gemeente.personalData.initials', type: 'string' },
        // { ident: 'pbdf.gemeente.personalData.firstnames', type: 'string' },
        // { ident: 'pbdf.gemeente.personalData.prefix', type: 'string' },
        // { ident: 'pbdf.gemeente.personalData.familyname', type: 'string', img: 'personal' },
        // { ident: 'pbdf.gemeente.personalData.fullname', type: 'string', img: 'personal' },
        // { ident: 'pbdf.gemeente.personalData.gender', type: 'string', options: ['M', 'V'] },
        // { ident: 'pbdf.gemeente.personalData.nationality', type: 'string' },
        // { ident: 'pbdf.gemeente.personalData.cityofbirth', type: 'string' },
        // { ident: 'pbdf.gemeente.personalData.countryofbirth', type: 'string' },
        // { ident: 'pbdf.gemeente.personalData.over12', type: 'boolean' },
        // { ident: 'pbdf.gemeente.personalData.over16', type: 'boolean' },
        // { ident: 'pbdf.gemeente.personalData.over18', type: 'boolean', img: 'calendar' }
        // { ident: 'pbdf.gemeente.personalData.over21', type: 'boolean' },
        // { ident: 'pbdf.gemeente.personalData.over65', type: 'boolean' }
        // { ident: 'pbdf.gemeente.personalData.bsn', type: 'string' },
        // {
        //     ident: 'pbdf.gemeente.personalData.digidlevel',
        //     type: 'string',
        //     options: ['Basis', 'Midden', 'Substantieel', 'Hoog']
        // }
    ],
    education: [
        {
            ident: 'pbdf.pbdf.surfnet-2.id',
            type: 'string',
            img: "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 5.277a.907.907 0 0 0-.296.05L4.198 6.558A.293.293 0 0 0 4 6.833c0 .123.079.232.198.275l.723.253a1.96 1.96 0 0 0-.32 1.075v.341c0 .345-.136.701-.28.982a3.204 3.204 0 0 1-.28.457.191.191 0 0 0-.03.182.198.198 0 0 0 .14.124l.8.195a.204.204 0 0 0 .155-.024.19.19 0 0 0 .09-.127c.107-.52.053-.987-.027-1.32A2.633 2.633 0 0 0 5 8.734v-.3c0-.366.128-.713.349-.99.161-.188.37-.34.615-.434l1.962-.75a.202.202 0 0 1 .26.11c.04.1-.01.213-.113.252l-1.963.75a1.15 1.15 0 0 0-.402.262l1.995.7a.907.907 0 0 0 .592 0l3.508-1.227A.292.292 0 0 0 12 6.833a.293.293 0 0 0-.197-.275l-3.507-1.23A.907.907 0 0 0 8 5.277Zm-2.4 4.57c0 .429 1.075.875 2.4.875s2.4-.446 2.4-.875l-.191-1.767-1.778.624a1.306 1.306 0 0 1-.862 0L5.79 8.08l-.19 1.767Z' fill='%23fff'/%3E%3C/svg%3E"
        }
    ],
    health: [
        {
            ident: 'pbdf.nuts.agb.agbcode',
            type: 'string',
            img: "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M5.714 5.75V4.734c0-.234.148-.445.372-.527L7.8 3.574a.585.585 0 0 1 .402 0l1.714.633a.563.563 0 0 1 .371.527V5.75h-.005c.004.046.005.093.005.14v.704c0 1.242-1.023 2.25-2.285 2.25-1.263 0-2.286-1.007-2.286-2.25V5.89c0-.048.002-.095.005-.141h-.007Zm.857.844C6.571 7.37 7.211 8 8 8c.79 0 1.429-.63 1.429-1.406v-.282H6.57v.282ZM6.305 9.18l1.486 1.554a.29.29 0 0 0 .416 0l1.486-1.554c1.316.262 2.305 1.407 2.305 2.78 0 .298-.246.539-.548.539H4.548A.545.545 0 0 1 4 11.96c0-1.373.991-2.517 2.305-2.779Zm1.41-4.837v.281h-.286a.142.142 0 0 0-.143.14v.282c0 .077.064.14.143.14h.285v.282c0 .077.065.14.143.14h.286a.142.142 0 0 0 .143-.14v-.282h.285a.142.142 0 0 0 .143-.14v-.281a.142.142 0 0 0-.143-.141h-.285v-.281a.142.142 0 0 0-.143-.14h-.286a.142.142 0 0 0-.143.14Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' transform='translate(4 3.5)' d='M0 0h8v9H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
            placeholder: '90012345'
        }
    ]
}
