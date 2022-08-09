export class Feed{
    constructor (_title:string, _description:string, _link:string)
    {
        this.title = _title;
        this.description = _description;
        this.link = _link;
    }

    title : string;

    get formattedTitle() : string {
        if(this.title.length > 62)
        {
            return this.title.substring(0,62) + '...';
        }

        return this.title;
    }


    description : string;
    link : string;
}