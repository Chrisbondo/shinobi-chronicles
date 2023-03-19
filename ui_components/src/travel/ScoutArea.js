/**
 * @param array{{
 * user_id:         int,
 * user_name:       string,
 * target_x:        int,
 * target_y:        int,
 * target_map_id:   int,
 * name:            string,
 * rank:            int,
 * village_icon:    string,
 * alignment:       string,
 * attack:          boolean,
 * attack_id:       string,
 * level:           int,
 * battle_id:       int
 * }} player
 */
export const ScoutArea = ({
    mapData,
    scoutData,
    membersLink,
    attackLink,
    view_as,
    view_genin,
    view_chuunin,
    view_jonin
}) => {
    return (
        <div className='travel-scout-container'>
            <div className='travel-scout'>
                {(mapData) && scoutData.map((player_data) => (
                    <Player key={player_data.user_id}
                            player_data={player_data}
                            membersLink={membersLink}
                            attackLink={attackLink}
                            view_as={view_as}
                            view_genin={view_genin}
                            view_chuunin={view_chuunin}
                            view_jonin={view_jonin}
                    />
                ))}
            </div>
        </div>
    );
};

const Player = ({
    player_data,
    membersLink,
    attackLink,
    view_as,
    view_genin,
    view_chuunin,
    view_jonin
}) => {

    if (parseInt(player_data.rank, 10) === 1 && view_as === false) {
        return (<></>);
    } else if (parseInt(player_data.rank, 10) === 2 && view_genin === false) {
        return (<></>);
    } else if (parseInt(player_data.rank, 10) === 3 && view_chuunin === false) {
        return (<></>);
    } else if (parseInt(player_data.rank, 10) === 4 && view_jonin === false) {
        return (<></>);
    }

    return (
        <div key={player_data.user_id}
             className={alignmentClass(player_data.alignment)}>
            <div className='travel-scout-name'>
                <a href={membersLink + '&user=' + player_data.user_name}>
                    {player_data.user_name}
                </a>
                <span>Lv.{player_data.level} - {player_data.name}</span>
            </div>
            <div className='travel-scout-location'>
                {player_data.target_x} &#8729; {player_data.target_y}
            </div>
            <div className='travel-scout-faction'>
                <img src={'./' + player_data.village_icon} alt='mist' />
            </div>
            <div className='travel-scout-attack'>
                {(player_data.attack === true && parseInt(player_data.battle_id, 10) === 0) && (
                    <a href={attackLink + '&attack=' + player_data.attack_id}></a>
                )}
                {(player_data.attack === true && parseInt(player_data.battle_id, 10) > 0) && (
                    <span></span>
                )}
            </div>
        </div>
    );
}

const alignmentClass = (alignment) => {
    let class_name = 'travel-scout-entry travel-scout-';
    switch (alignment) {
        case 'Ally':
            class_name += 'ally';
            break;
        case 'Enemy':
            class_name += 'enemy';
            break;
        case 'Neutral':
            class_name += 'neutral';
            break;
    }
    return class_name;
}