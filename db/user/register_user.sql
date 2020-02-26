insert into users (
    email,
    f_name,
    l_name,
    password
) values (
    $1,
    $2,
    $3,
    $4
)
returning email, f_name, l_name;