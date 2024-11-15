create extension if not exists "uuid-ossp";
create table products (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    price decimal(10, 2) not null,
    stock int not null default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Add RLS policies
alter table products enable row level security;
create policy "Products are viewable by everyone" on products for
select using (true);