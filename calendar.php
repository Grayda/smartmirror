<?php

  include("./vendor/autoload.php");
  use ICal\ICal;

  $json = json_decode(file_get_contents("./config/config.json"));
  $cal = [];
  $notes = [];
  $events = (new ICal($json->calendar->url))->eventsFromRange((new DateTime($json->calendar->start))->format("Y-m-d"), (new DateTime($json->calendar->end))->format("Y-m-d"));
  foreach($events as $event) {
    $icon = null;

    foreach($json->icons as $eventIcon) {
      if(preg_match($eventIcon->keyword, $event->summary)) {
        $icon .= implode(" ", $eventIcon->class);
      }
    }

    if(stripos($event->summary, "note:") === 0) {
      $notes[] = array(
        "name" => htmlspecialchars_decode(preg_split("/note:/i", $event->summary)[1]),
        "start" => (new DateTime($event->dtstart))->format("c"),
        "icon" => $icon,
        "class" => ""
      );
    } else if(stripos($event->summary, "important:") === 0) {
      $notes[] = array(
        "name" => htmlspecialchars_decode(preg_split("/important:/i", $event->summary)[1]),
        "start" => (new DateTime($event->dtstart))->format("c"),
        "icon" => $icon,
        "class" => "bg-danger"
      );
    } else {
      if($icon == null) { $icon = "fa-calendar-o"; }
      $cal[] = array(
        "name" => htmlspecialchars_decode($event->summary),
        "description" => htmlspecialchars_decode($event->description),
        "location" => htmlspecialchars_decode($event->location),
        "start" => (new DateTime($event->dtstart))->format("c"),
        "end" => (new DateTime($event->dtend))->format("c"),
        "icon" => $icon,
        "class" => ""
      );
    }
  }

  echo json_encode(array("calendar" => $cal, "notes" => $notes), JSON_PRETTY_PRINT);

 ?>
