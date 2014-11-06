<!DOCTYPE html>
<html <?php language_attributes(); ?> data-ng-app="sovietApp">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
	<meta name="author" content="Ciplex">
	<link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" type="text/css" media="screen" />
	<?php wp_head();?>
</head>
<body>
	<div data-ng-include="wpBaseDir + '/views/header.html'"></div>
	<div class="header-placeholder"></div>
