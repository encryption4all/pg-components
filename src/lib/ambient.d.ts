export {}

declare global {
    interface Policy {
        [key: string]: AttributeCon
    }

    interface PolicyListItem {
        id: string
        con: AttributeRequestItem[]
        removeActive?: boolean
    }

    type AttributeCon = AttributeRequest[]

    interface AttributeRequestItem {
        at: AttributeRequest
        focused: boolean
    }

    interface AttributeRequest {
        t: string
        v?: string
    }

    interface AttributeType {
        ident: string
        type: string
        options?: string[]
        img?: string
        placeholder?: string
        pattern?: string
    }
}
