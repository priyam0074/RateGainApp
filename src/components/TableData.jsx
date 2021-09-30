import { CommentMetadata, Item } from "semantic-ui-react";

import * as sanitizeHtml from 'sanitize-html';
import {SocialMediaIconsReact} from 'social-media-icons-react';
const metaDat = {
    key: '',
    text: '',
    sort:false
}
const defaultOptions = {
    allowedTags: [ 'p','b', 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
      'a': [ 'href' ]
    },
  };

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const sanitize = (dirty, options) => ({
    __html: sanitizeHtml(
      dirty, 
      { ...defaultOptions, ...options }
    )
  });

  const SanitizeHTML = ({ html, options }) => (
    <div dangerouslySetInnerHTML={sanitize(html, options)} />
  );

  const formatDate =(date)=> {
      return new Date(date).toLocaleDateString("en-US", dateOptions);
  }

  const formatIcon = (icon)=> {
      if(!icon || icon !=='null') {
      if( icon.split('_').length > 1 ) {
          return icon.split('_')[0];
      } else if(icon.split('_').length == 1) {
           return icon;
      }
    }
      return 'codepen';

  }
const TableData =({ data, meta })=> {
    console.log(data);
    const headerOrder = meta.map(m => m.text);
    return (
        <table className={'table-resp'}>

        <thead>
           { headerOrder.map(item=> <th>{item}</th>) }
        </thead>
      <tbody>
      { data.length && data.map(({id, property_name,user_name, social_network,post_date, post_media,post_content, profile_picture})=> 
          
            <tr>
              <td data-label="id">{id}</td>
              <td data-label="Property">{property_name || 'Unknown'}</td>
              <td data-label="User"><h4>{user_name}</h4><img className={'img-media xyz'} src={profile_picture} alt={user_name}></img></td>
              <td data-label="Network"><SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" icon={formatIcon(social_network)} iconColor="rgba(255,255,255,1)" backgroundColor="rgba(26,166,233,1)"></SocialMediaIconsReact></td>
              <td data-label="Date">{formatDate(post_date) }</td>
              <td data-label="Image"><img className={'img-media'} src={post_media} alt="img loading"/></td>
              {/* <td>{sanitizeHtml(post_content)}</td> */}
             <td data-label="Content"><SanitizeHTML html={post_content}  /></td> 
              </tr>)}
             
          
        
      </tbody>
      </table>
    )
  }

  export default TableData;