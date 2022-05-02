# Navigation

## Nav bar
- As a user, I want a navigation bar to appear at the top of the screen that is consistent across pages.
    - When I am unauthenticated, I should see a login and sign up button.
    - When I am authenticated, I should see my profile picture which links to my profile.

# Users

## Sign Up

- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
    - When I'm on the `/signup` page:
        - I would like to be able to enter my email, name, and preferred password on a clearly laid out form.
        - I would like the website to log me in upon successful completion of the sign-up form.
            - So that I can seamlessly access the site's functionality
    - When I enter invalid data on the sign-up form:
        - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
        - So that I can try again without needing to refill forms I entered valid data into.


## Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
    - When I'm on the `/login` page:
        - I would like to be able to enter my email and password on a clearly laid out form.
        - I would like the website to log me in upon successful completion of the lob-up form.
            - So that I can seamlessly access the site's functionality
    - When I enter invalid data on the log-up form:
        - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
            - So that I can try again without needing to refill forms I entered valid data into.

## Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
    - When I'm on either the `/signup` or `/login` pages:
        - I can click on a Demo User button to log me in and allow me access as a normal user.
            - So that I can test the site's features and functionality without needing to stop and enter credentials.

## Log out

- As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
    - While on any page of the site:
        - I can log out of my account and be redirected to a the homepage.
            - So that I can easily log out to keep my information secure.

# Groups

## Viewing groups

- As a user, I want to be able to see a list of all the groups.
    - When I'm on `/groups/`:
        - If I am authenticated, I can see a list of all the groups I am a member of.
            - If I am not a member of any groups I want to see a message saying so.
        - I can see a list of all the groups.
            - I would like some options to change the sorting or search.

## Group detail page

- As a user who is not a member or organizer of the group, I want to be able to request to join the group using a button on the group detail page.
    - When I am on `/groups/:groupId`:
        - I can click a button that requests to join the current group.
    - When I am not authenticated and I click the button:
        - I would like to be redirected to the login page.

- As a user who is a member of the group, I want to be able to use a "Leave group" button to leave the group.
    - When I'm on `/groups/:groupId`:
        I can click a button that removes my membership from the group.

- As a user, I want to be able to see the past and upcoming events for a group.
    - When I'm on `/groups/:groupId/events`:
     - I can see all the events for the group. I want to see upcoming events when the page loads, but I want a button that I can click to show all the past events instead.

- As a user, I want to be able to see the members of this group.
    - When I'm on `/groups:groupId/members`:
        - I can see a list of the members of the group and the month and year of when they became a member.

## Creating a group

- As an authenticated user, I want to be able to create my own group.
    - When I'm on `/groups/new`:
        - I can enter the group details on a well labeled form.
        - I would like the website to redirect me to the details page of the new group upon success.
            - So that I can view what the group details looks like currently
    - When I enter invalid data on the form:
        - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
            - So that I can attempt the form again without reentering all the information.

## Deleteing a group

- As an authenticated user who is also the organizer of the group, I want to be able to delete a group by clicking a delete button on the group details page.
    - When I'm on `/groups/:groupId`:
        - I can click "Delete group" to delete the current group.
        - I would like a confirmation box to appear to confirm the deletion.

## Updating a group

- As an authenticated user who is also the organizer of the group, I want to be able to update the details of my group from the group details page.
    - When I'm on `/groups/:groupId`:
        - I can click an "Update group" button which will redirect me to a form located at `/groups/:groupId/edit`.
    - When I'm on `/groups/:groupId/edit`:
        - I can fill out the same form as the create group with the current group details prefilled.


# Events

## Viewing events

- As a user, I want to see a list of all upcoming events.
    - When I'm on `/events`:
        - If I am authenticated, I can see a list of all the events belonging to groups I am a member of.
            - If there are no upcoming events in my groups I want to see a message saying so.
        - I can see a list of all the upcoming events.
            - I would like some options to change the sorting or search.

## Creating events

- As an authenticated user who is organizer or co-host, I want to be able to create events for my group.
    - When I'm on `/groups/:groupId/events`:
        - I can click a "New event" button which will redirect me to a form located at `/groups/:groupId/events/new`.
    - When I'm on `/groups/:groupId/events/new`:
        - I can enter the information for my new event and submit it.
        - I would like the website to redirect me to the event detail page upon successful creation.
            - So that I can review the event details as it currently exists.
    - When I enter invalid data on the form:
        - I would like to be informed of the validations I failed to pass, and repopulate the form with my valid entries.
            - So that I can attempt the form again without reentering all the information.

## Events details page

- As a user who is not attending the event, I want to be able to request to attend the event using a button.
    - When I am on `/groups/:groupId/events/:eventId`:
        - I can click a button that requests to attend the current event.
    - When I am not authenticated and I click the button I want to be redirected to the login page.

- As a user who is attending the event, I want to be able to delete my attendance to the event using a button.
    - When I am on `/groups/:groupId/events/:eventId`:
        - I can click a button that removes my attendance from the event.

- As a user I want to be able to see all the details pertaining to the event.
    - When I am on `/groups/:groupId/events/:eventId`:
        - I can see the event host, description, venue, and attendees.

- As an authenticated user who is organizer or co-host, I want to be able to see all users who are both attending and requested attendance and approve, deny, and remove their attendance via buttons.
    - When I am on `/groups/:groupId/events/:eventId`:
        - I can see all users who are both attending and requesting attendance
        - I can approve or deny people who have requested to join
        - I can change someone's status to waitlisted or

## Deleting an event

- As an authenticated user who is also the organizer of the group, I want to be able to delete an event by clicking a button.
    - When I'm on the details page for an event:
        - I can click a button that allows me to remove the current event.
        - I would prefer if there was a confirmation before the event was actually deleted.

## Updating an event

- As an authenticated user who is also the organizer of the group, I want to be able to update the details of the event.
    - When I'm on the event details page:
        - I can click an "Update event" button which will redirect me to a form located at `/groups/:groupId/edit`.
    - When I'm on `/groups/:groupId/events/:eventId/edit`:
        - I can fill out the same form as the create event with the current event details prefilled.
